export class Descriptor{
    className: string;
    enabledForWebApi: boolean = false;
    enabledForDynamicPost: boolean = false;

    enabledMethodsForPost: string[];
}