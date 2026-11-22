/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Cp_All_CommunitiesInputs */

const en_cp_all_communities = /** @type {(inputs: Cp_All_CommunitiesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All communities (${i?.count})`)
};

const zh_cp_all_communities = /** @type {(inputs: Cp_All_CommunitiesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`现有社区 (${i?.count})`)
};

/**
* | output |
* | --- |
* | "All communities ({count})" |
*
* @param {Cp_All_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_all_communities = /** @type {((inputs: Cp_All_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_All_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_all_communities(inputs)
	return zh_cp_all_communities(inputs)
});