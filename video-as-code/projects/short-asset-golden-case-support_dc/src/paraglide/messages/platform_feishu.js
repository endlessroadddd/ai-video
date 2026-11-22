/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Platform_FeishuInputs */

const en_platform_feishu = /** @type {(inputs: Platform_FeishuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu`)
};

const zh_platform_feishu = /** @type {(inputs: Platform_FeishuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`飞书`)
};

/**
* | output |
* | --- |
* | "Feishu" |
*
* @param {Platform_FeishuInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_feishu = /** @type {((inputs?: Platform_FeishuInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_FeishuInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_platform_feishu(inputs)
	return zh_platform_feishu(inputs)
});