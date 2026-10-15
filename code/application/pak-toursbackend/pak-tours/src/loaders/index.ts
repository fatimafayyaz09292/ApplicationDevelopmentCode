import expressLoader from "./express.js";
import type { Express } from "express";

export default async function({app}:{app:Express}){
    await expressLoader({app});
}
