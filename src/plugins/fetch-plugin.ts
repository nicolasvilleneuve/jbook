import * as esbuild from 'esbuild-wasm';
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
    name: 'file-cache'
});

export const FetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({filter: /.*/}, async (args: any) => {

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode
                    };
                }
                // check to see if file already fetched. If so => in the cache //
                // if in the cache, return that version immediately //

                const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                if (cacheResult) {
                    return cacheResult;
                }

                const {data, request} = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname,
                };
                // store response in cache //
                await fileCache.setItem(args.path, result);
            });
        }
    }
}