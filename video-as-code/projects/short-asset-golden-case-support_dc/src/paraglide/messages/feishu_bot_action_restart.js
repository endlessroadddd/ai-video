/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Action_RestartInputs */

const en_feishu_bot_action_restart = /** @type {(inputs: Feishu_Bot_Action_RestartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restart`)
};

const zh_feishu_bot_action_restart = /** @type {(inputs: Feishu_Bot_Action_RestartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重启`)
};

/**
* | output |
* | --- |
* | "Restart" |
*
* @param {Feishu_Bot_Action_RestartInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_action_restart = /** @type {((inputs?: Feishu_Bot_Action_RestartInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Action_RestartInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_action_restart(inputs)
	return zh_feishu_bot_action_restart(inputs)
});