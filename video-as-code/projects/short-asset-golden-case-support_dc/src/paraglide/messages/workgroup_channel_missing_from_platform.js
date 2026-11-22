/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Channel_Missing_From_PlatformInputs */

const en_workgroup_channel_missing_from_platform = /** @type {(inputs: Workgroup_Channel_Missing_From_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This channel was not returned by the current platform list`)
};

const zh_workgroup_channel_missing_from_platform = /** @type {(inputs: Workgroup_Channel_Missing_From_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前平台列表未返回该频道`)
};

/**
* | output |
* | --- |
* | "This channel was not returned by the current platform list" |
*
* @param {Workgroup_Channel_Missing_From_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_channel_missing_from_platform = /** @type {((inputs?: Workgroup_Channel_Missing_From_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Channel_Missing_From_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_channel_missing_from_platform(inputs)
	return zh_workgroup_channel_missing_from_platform(inputs)
});