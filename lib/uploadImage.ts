import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "654d497bccd3444ea185",
        ID.unique(),
        file
    );

    return fileUploaded;

    
};

export default uploadImage;