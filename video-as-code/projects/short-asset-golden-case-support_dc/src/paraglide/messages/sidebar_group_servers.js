/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Group_ServersInputs */

const en_sidebar_group_servers = /** @type {(inputs: Sidebar_Group_ServersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Servers`)
};

const zh_sidebar_group_servers = /** @type {(inputs: Sidebar_Group_ServersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`服务器`)
};

/**
* | output |
* | --- |
* | "Servers" |
*
* @param {Sidebar_Group_ServersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_servers = /** @type {((inputs?: Sidebar_Group_ServersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_ServersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_group_servers(inputs)
	return zh_sidebar_group_servers(inputs)
});