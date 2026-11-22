/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Add_CommunityInputs */

const en_integration_add_community = /** @type {(inputs: Integration_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Community`)
};

const zh_integration_add_community = /** @type {(inputs: Integration_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加社区`)
};

/**
* | output |
* | --- |
* | "Add Community" |
*
* @param {Integration_Add_CommunityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_add_community = /** @type {((inputs?: Integration_Add_CommunityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Add_CommunityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_add_community(inputs)
	return zh_integration_add_community(inputs)
});