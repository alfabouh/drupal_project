export type writeValue<T> = (localStorage: Storage, key: string, value: T) => void;
export type readValue<T> = (localStorage: Storage, key: string) => T;
export type CallbackFunction = (response: string) => void;
class ProjectUtils {
    public WriteIn: writeValue<string> = (localStorage, key, value) => {
        localStorage.setItem(key, value);
        console.log("Saved: " + key + " - " + value);
    };
    public ReadFrom: readValue<string> = (localStorage, key) => {
        let value: string = localStorage.getItem(key) as string;
        console.log("Read: " + key + " - " + value);
        return value;
    };

    public getFileText(url: string, callback: CallbackFunction): void {
        fetch(url).then(response => response.text()).then(text => callback(text)).catch(error => console.error(error));
    }

    public replaceAt(str: string, idx: number, to: string): string {
        if (idx < 0 || idx >= str.length) {
            throw new Error("Array index out of bounds!");
        }
        let charArray: any = str.split("");
        charArray[idx] = to;
        return charArray.join("");
    }

    public getRandomNum(a: number, b:number): number {
        return Math.floor(Math.random() * b) + a;
    }
}
export let Utils: ProjectUtils = new ProjectUtils();