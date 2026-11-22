/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Participant_Avatar_AltInputs */

const en_assist_tasks_participant_avatar_alt = /** @type {(inputs: Assist_Tasks_Participant_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Participant avatar`)
};

const zh_assist_tasks_participant_avatar_alt = /** @type {(inputs: Assist_Tasks_Participant_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`参与者头像`)
};

/**
* | output |
* | --- |
* | "Participant avatar" |
*
* @param {Assist_Tasks_Participant_Avatar_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_participant_avatar_alt = /** @type {((inputs?: Assist_Tasks_Participant_Avatar_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Participant_Avatar_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_participant_avatar_alt(inputs)
	return zh_assist_tasks_participant_avatar_alt(inputs)
});