/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Action_UpdatingInputs */

const en_feishu_bot_action_updating = /** @type {(inputs: Feishu_Bot_Action_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updating...`)
};

const zh_feishu_bot_action_updating = /** @type {(inputs: Feishu_Bot_Action_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新中...`)
};

/**
* | output |
* | --- |
* | "Updating..." |
*
* @param {Feishu_Bot_Action_UpdatingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_updating = /** @type {((inputs?: Feishu_Bot_Action_UpdatingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_UpdatingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_action_updating(inputs)
	return zh_feishu_bot_action_updating(inputs)
});