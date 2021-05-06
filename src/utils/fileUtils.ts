import fs from 'fs';

export default class FileUtils {

    static async listDirectory(path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err: NodeJS.ErrnoException | null, files: string[]) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(files);
            });
        });
    }
    static async readFile(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data.toString());
            })
        });
    }

    static async writeFile(path: string, data: object | string): Promise<void> {
        return new Promise((resolve, reject) => {
            const dataString = typeof data === 'object' ? JSON.stringify(data, undefined, 4) : data;
            fs.writeFile(path, dataString, 'utf-8', (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    static async extractJsonContentFromFiles(path: string, fileList: string[]): Promise<object[]> {

        let promises: Promise<object>[] = fileList.map(async (file) => {
            return new Promise(async (resolve, reject) => {
                let content = await FileUtils.readFile(`${path}/${file}`)
                    .catch(err => {
                        reject(err);
                        return;
                    });
                resolve(content ? JSON.parse(content) : content);
            });
        })
        return Promise.all(promises);
    }
}