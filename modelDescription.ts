export type AttributesTypes = "string" | "string[]" | "int" | "double" | "boolean" | "date" | "image"

export interface createposte { 
    name:string,
    description:string,
    image:string,
    create: (name:string, description:string, image:string)=>string
}

export interface updateposte {
    name:string,
    description:string,
    image:string,
    update: (name:string, description:string, image:string)=>string
}

export interface deleteposte {
    name:string,
    delete: (name:string)=>string
}

export interface getposte {
    name:string,
    get: (name:string)=>string
}

export interface getallposte {
    getall: ()=>string
}