import 'reflect-metadata';
import {Connection, createConnection, Entity} from 'typeorm'
import * as debug from "debug";
import Photo from "./models/Photo";
import PhotoMeta from "./models/PhotoMeta";
import TodoTask from "./models/TodoTask";

const d = debug('typeorm:debug');

const getConnection = () => createConnection({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'lawea',
    entities: [__dirname + '/models/*.js'],
    autoSchemaSync: true,
});

const getMockPhoto = () => {
    const photo = new Photo();
    photo.name = 'Perrito fome';
    photo.description = 'anuma un perrito apachurrable';
    photo.filename = 'pirriti-fimi.png';
    photo.views = 32;
    photo.isPublished = true;
    photo.color = '#123321';
    return photo;
};

const getMockPhotoMeta = (photo: Photo) => {
    const photoMeta = new PhotoMeta();
    photoMeta.height = 640;
    photoMeta.width = 480;
    photoMeta.compressed = false;
    photoMeta.comment = 'cybershoot';
    photoMeta.orientation = 'portrait';
    photoMeta.photo = photo; // This is how we connect them
    return photoMeta;
};

async function createAndInsertIntoDatabaseUsingAEntityManager(connection: Connection) {
    try {
        const photo = getMockPhoto();
        const savedPhoto = await connection.manager.save(photo);
        d('Photo saved', savedPhoto);
    } catch (error) {
        d('could not save', error);
    }
}

async function createAndInsertIntoDatabaseUsingARepository(connection: Connection) {
    try {
        const photo = getMockPhoto();
        const photoRepository = connection.getRepository(Photo);
        const savedPhoto = await photoRepository.save(photo);
        d('Photo saved with repository', savedPhoto);
        const savedPhotos = await photoRepository.find();
        d('Photos retrieved with repository', savedPhotos);
    } catch (error) {
        d('Repository operations failed');
    }
}

async function loadingPhotosFromDatabase(connection: Connection) {
    try {
        const photoRepository = connection.getRepository(Photo);

        const all = await photoRepository.find();
        d('All photos from DB', all);

        const firstPhoto = await photoRepository.findOneById(1);
        d('First photo from DB', firstPhoto);

        // const photoOfWoff = await photoRepository.findOne({where: {name: 'woff'}});
        const photoOfWoff = await photoRepository.findOne({name: 'woff'});
        d('Photo of "Woff"', photoOfWoff);

        const impossibleName = `impossible${Date.now()}to-match${Math.random()}`;
        const notFoundPhoto = await photoRepository.findOne({where: {name: impossibleName}});
        const notFoundPhotos = await photoRepository.find({where: {name: impossibleName}});
        d(`Photo not found "${impossibleName}"`, {notFoundPhoto, notFoundPhotos});

        const unviewedPhotos = await photoRepository.find({where: {views: 0}});
        d('Unviewed photos', unviewedPhotos);

        const allUnpublishedPhotos = await photoRepository.find({where: {isPublished: false}});
        d('All unpublished photos', allUnpublishedPhotos);

        const [allPhotos, photosCount] = await photoRepository.findAndCount();
        d('All with the findAndCount method', {allPhotos, photosCount});
    } catch (error) {
        d('loadingPhotosFromDatabase failed', error);
    }
}

async function loadAPhotoMeta(connection: Connection) {
    try {
        const photoMetaRepository = connection.getRepository(PhotoMeta);
        const photoMeta = await photoMetaRepository.findOne(); // It does not load the photo id.
        d('a photo meta', photoMeta);
    } catch (error) {
        d('failed to load a photo meta', error);
    }
}

async function updatePhotoInTheDatabase(connection: Connection) {
    try {
        const photoRepository = connection.getRepository(Photo);
        const photoToUpdate = await photoRepository.findOneById(1);
        if (!photoToUpdate) return;
        photoToUpdate.name = 'New name';
        const updatedPhoto = await photoRepository.save(photoToUpdate);
        d('Updated photo', updatedPhoto);
    } catch (error) {
        d('Fail update photo in DB', error);
    }
}

async function removePhotoFromDatabase(connection: Connection) {
    try {
        const photoRepository = connection.getRepository(Photo);
        const photoMetaRepository = connection.getRepository(PhotoMeta);
        const photoToRemove = await photoRepository.findOneById(13);
        if (!photoToRemove) {
            d('There is not photo to remove');
            return;
        }
        const photoMetaToRemove = await photoMetaRepository.find({where: {photo: 13}});
        const removeMetasResult = await Promise.all(photoMetaToRemove.map(metaToRemove => photoMetaRepository.remove(metaToRemove)));
        d('Removed meta (this should be done by the on-remove-cascade functionality of de DB itself)', removeMetasResult);
        const result = await photoRepository.remove(photoToRemove);
        d('Removed photo', {result});
    } catch (error) {
        d('Remove failed', error);
    }
}

async function persistingAnObjectWithAOneToOneRelation(connection: Connection) {
    try {
        const photo = getMockPhoto();
        const photoMeta = getMockPhotoMeta(photo);

        // Get repositories
        const photoRepository = connection.getRepository(Photo);
        const photoMetaRepository = connection.getRepository(PhotoMeta);

        // Persist photo first
        const savedPhoto = await photoRepository.save(photo);

        // ... then, persist the photo meta
        const savedPhotoMeta = await photoMetaRepository.save(photoMeta);

        d('One to one relation saved correctly', {savedPhoto, savedPhotoMeta});
    } catch (error) {
        d('One to one relation failed', error);
    }
}

async function loadingObjectsWithTheirRelationsUsingFindOptions(connection: Connection) {
    try {
        const photoRepository = connection.getRepository(Photo);
        const photos = await photoRepository.find({
            join: {
                // An alias name of the data we are selecting
                alias: 'photo',
                innerJoinAndSelect: {
                    // "photo" is the alias we used a line above.
                    // "metadata" is the property name with the relation of the object we are selecting.
                    // "xxxmetadata" is an alias to the data returned by the join expression, it could be named also 'metadata' but I prefixed it with 'xxx' to differentiate them.
                    'xxxmetadata': 'photo.metadata'
                }
            },
        });
        d('loadingObjectsWithTheirRelationsUsingFindOptions :: ', photos);
    } catch (error) {
        d('loadingObjectsWithTheirRelationsUsingFindOptions fail :: ', error);
    }
}

async function loadingObjectsWithTheirRelationsUsingQueryBuilder(connection: Connection) {
    try {
        const photoRepository = connection.getRepository(Photo);
        const photos = await photoRepository.createQueryBuilder('photo')
            .innerJoinAndSelect('photo.metadata', 'metadata')
            .getMany();
        d('loadingObjectsWithTheirRelationsUsingQueryBuilder', photos);
    } catch (error) {
        d('loadingObjectsWithTheirRelationsUsingQueryBuilder fail', error);
    }
}

async function testTodoTasks(connection: Connection) {
    try {
        const todoTaskRepository = connection.getRepository(TodoTask);
        const x = new TodoTask();
        x.content = 'Comprar carne';
        x.description = 'Comprar un chingo de carne';
        x.isCompleted = false;
        const saved = await todoTaskRepository.save(x);
        d('testTodoTasks', saved);
    } catch (error) {
        d('testTodoTasks fail', error);
    }
}

async function test() {
    try {
        const connection = await getConnection();
        // await createAndInsertIntoDatabaseUsingAEntityManager(connection);
        // await createAndInsertIntoDatabaseUsingARepository(connection);
        // await loadingPhotosFromDatabase(connection);
        // await loadAPhotoMeta(connection);
        // await updatePhotoInTheDatabase(connection);
        // await removePhotoFromDatabase(connection);
        // await persistingAnObjectWithAOneToOneRelation(connection);
        // await loadingObjectsWithTheirRelationsUsingFindOptions(connection);
        // await loadingObjectsWithTheirRelationsUsingQueryBuilder(connection);
        await testTodoTasks(connection);
    } catch (error) {
        d('fail', error);
    }
}

(async () => await test() || process.exit(0))();