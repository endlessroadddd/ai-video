/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Slack_ReadyInputs */

const en_workgroup_slack_ready = /** @type {(inputs: Workgroup_Slack_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack is connected. You can continue selecting workgroups.`)
};

const zh_workgroup_slack_ready = /** @type {(inputs: Workgroup_Slack_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已关联 Slack，可继续选择工作群。`)
};

/**
* | output |
* | --- |
* | "Slack is connected. You can continue selecting workgroups." |
*
* @param {Workgroup_Slack_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_slack_ready = /** @type {((inputs?: Workgroup_Slack_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Slack_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_slack_ready(inputs)
	return zh_workgroup_slack_ready(inputs)
});