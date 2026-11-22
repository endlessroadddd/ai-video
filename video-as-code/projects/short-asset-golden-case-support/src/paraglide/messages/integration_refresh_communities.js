/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Refresh_CommunitiesInputs */

const en_integration_refresh_communities = /** @type {(inputs: Integration_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refresh community list`)
};

const zh_integration_refresh_communities = /** @type {(inputs: Integration_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刷新社区列表`)
};

/**
* | output |
* | --- |
* | "Refresh community list" |
*
* @param {Integration_Refresh_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_refresh_communities = /** @type {((inputs?: Integration_Refresh_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Refresh_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_refresh_communities(inputs)
	return zh_integration_refresh_communities(inputs)
});