export class Descriptor{
    className: string;
    enabledForWebApi: boolean = false;
    enabledForDynamicPost: boolean = false; // non ancora implementata

    enabledMethodsForPost: string[];
}