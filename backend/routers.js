import {ok} from 'wix-router';
let i = 0;

export function date_router(request) {
    return ok('page', new Date().toString());
}

export function counter_router(request) {
    return ok('page', i++);
}

export function exec_router(request) {
    return ok('page', eval(request.formFactor));
}

export function my_sitemap(sitemapRequest) {
    return Promise.resolve([]);
}