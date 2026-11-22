/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Sidebar_Servers_CountInputs */

const en_sidebar_servers_count = /** @type {(inputs: Sidebar_Servers_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} organizations`)
};

const zh_sidebar_servers_count = /** @type {(inputs: Sidebar_Servers_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 组织`)
};

/**
* | output |
* | --- |
* | "{count} organizations" |
*
* @param {Sidebar_Servers_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_servers_count = /** @type {((inputs: Sidebar_Servers_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Servers_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_servers_count(inputs)
	return zh_sidebar_servers_count(inputs)
});