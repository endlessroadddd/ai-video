/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Status_ErrorInputs */

const en_feishu_bot_status_error = /** @type {(inputs: Feishu_Bot_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error`)
};

const zh_feishu_bot_status_error = /** @type {(inputs: Feishu_Bot_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常`)
};

/**
* | output |
* | --- |
* | "Error" |
*
* @param {Feishu_Bot_Status_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_error = /** @type {((inputs?: Feishu_Bot_Status_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_status_error(inputs)
	return zh_feishu_bot_status_error(inputs)
});