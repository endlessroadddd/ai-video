/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Status_PendingInputs */

const en_feishu_bot_status_pending = /** @type {(inputs: Feishu_Bot_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending`)
};

const zh_feishu_bot_status_pending = /** @type {(inputs: Feishu_Bot_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待确认`)
};

/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Feishu_Bot_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_status_pending = /** @type {((inputs?: Feishu_Bot_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_status_pending(inputs)
	return zh_feishu_bot_status_pending(inputs)
});