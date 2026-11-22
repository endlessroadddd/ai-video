/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Action_EnableInputs */

const en_feishu_bot_action_enable = /** @type {(inputs: Feishu_Bot_Action_EnableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enable`)
};

const zh_feishu_bot_action_enable = /** @type {(inputs: Feishu_Bot_Action_EnableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用`)
};

/**
* | output |
* | --- |
* | "Enable" |
*
* @param {Feishu_Bot_Action_EnableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_enable = /** @type {((inputs?: Feishu_Bot_Action_EnableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_EnableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_action_enable(inputs)
	return zh_feishu_bot_action_enable(inputs)
});