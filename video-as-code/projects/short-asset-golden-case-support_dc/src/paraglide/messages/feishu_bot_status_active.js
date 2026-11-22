/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Status_ActiveInputs */

const en_feishu_bot_status_active = /** @type {(inputs: Feishu_Bot_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active`)
};

const zh_feishu_bot_status_active = /** @type {(inputs: Feishu_Bot_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已启用`)
};

/**
* | output |
* | --- |
* | "Active" |
*
* @param {Feishu_Bot_Status_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_active = /** @type {((inputs?: Feishu_Bot_Status_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_status_active(inputs)
	return zh_feishu_bot_status_active(inputs)
});