/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_Collapse_SidebarInputs */

const en_header_collapse_sidebar = /** @type {(inputs: Header_Collapse_SidebarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Collapse sidebar`)
};

const zh_header_collapse_sidebar = /** @type {(inputs: Header_Collapse_SidebarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`折叠侧边栏`)
};

/**
* | output |
* | --- |
* | "Collapse sidebar" |
*
* @param {Header_Collapse_SidebarInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_collapse_sidebar = /** @type {((inputs?: Header_Collapse_SidebarInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Collapse_SidebarInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_collapse_sidebar(inputs)
	return zh_header_collapse_sidebar(inputs)
});