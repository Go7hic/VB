/**
 * 获取 Github 文章的标题
 *
 * @param title
 * @returns {string}
 */
export function onlyTitle(title) {
    // return title.replace(/^\d{4}-\d{1,2}-\d{1,2}-(.+?)\.md$/, '$1');
    return title.replace(/\.md$/, '')
                .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '');
}

/**
 * 获取 Github 文章的内容
 *
 * @param title
 * @returns {array|null}
 */
export function onlyPublishDate(title) {
    // return /^\d{4}-(?:0?[1-9]|1[0-2])-\d{1,2}/.exec(title);
    return /^\d{4}-\d{1,2}-\d{1,2}/.exec(title);
}
