export type CallbackFunction = (response: string) => void;
class ProjectUtils {
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