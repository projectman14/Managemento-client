import { Client, Storage, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a37629002c824843f4');

const profileUrl = async (file) => {
    const storage = new Storage(client);

    const promise = storage.createFile(
        '66a37677001349a33dda',
        ID.unique(),
        file
    );

    let response = {};
    let url

    await promise.then(async function (response) {
        const result = await storage.getFileView('66a37677001349a33dda', response.$id);
        url = result.href;
        return result.href;
    }, function (error) {
        console.log(error); 
    });

    return url

}

export { profileUrl }