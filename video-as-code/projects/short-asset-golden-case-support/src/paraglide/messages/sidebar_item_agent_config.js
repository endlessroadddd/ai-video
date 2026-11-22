/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Agent_ConfigInputs */

const en_sidebar_item_agent_config = /** @type {(inputs: Sidebar_Item_Agent_ConfigInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent Config`)
};

const zh_sidebar_item_agent_config = /** @type {(inputs: Sidebar_Item_Agent_ConfigInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent配置`)
};

/**
* | output |
* | --- |
* | "Agent Config" |
*
* @param {Sidebar_Item_Agent_ConfigInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_agent_config = /** @type {((inputs?: Sidebar_Item_Agent_ConfigInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Agent_ConfigInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_agent_config(inputs)
	return zh_sidebar_item_agent_config(inputs)
});