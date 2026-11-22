/* eslint-disable */
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} App_DescriptionInputs */
/** @typedef {{}} App_TitleInputs */
/** @typedef {{}} Auth_BackInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Callback_FailedInputs */
/** @typedef {{}} Auth_Callback_Invalid_LinkInputs */
/** @typedef {{}} Auth_Callback_Missing_SessionInputs */
/** @typedef {{}} Auth_Callback_Unknown_ErrorInputs */
/** @typedef {{}} Auth_Email_LabelInputs */
/** @typedef {{}} Auth_Email_LoginInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Email_Login_FailedInputs */
/** @typedef {{}} Auth_Email_PlaceholderInputs */
/** @typedef {{}} Auth_Email_RequiredInputs */
/** @typedef {{}} Auth_Get_Magic_LinkInputs */
/** @typedef {{}} Auth_Login_TitleInputs */
/** @typedef {{}} Auth_Login_With_GithubInputs */
/** @typedef {{}} Auth_Login_With_GoogleInputs */
/** @typedef {{}} Auth_Magic_Link_Sent_HintInputs */
/** @typedef {{ email: NonNullable<unknown> }} Auth_Magic_Link_Sent_ToInputs */
/** @typedef {{}} Auth_OrInputs */
/** @typedef {{}} Auth_Provider_GithubInputs */
/** @typedef {{}} Auth_Provider_GoogleInputs */
/** @typedef {{ provider: NonNullable<unknown>, message: NonNullable<unknown> }} Auth_Provider_Login_FailedInputs */
/** @typedef {{}} Auth_ResendInputs */
/** @typedef {{ seconds: NonNullable<unknown> }} Auth_Resend_CountdownInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Resend_Email_FailedInputs */
/** @typedef {{}} Auth_Unknown_Error_RetryInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_TitleInputs */
/** @typedef {{}} Assist_Tasks_Add_SupplementalInputs */
/** @typedef {{}} Assist_Tasks_Assignee_LabelInputs */
/** @typedef {{}} Assist_Tasks_Close_Event_DetailInputs */
/** @typedef {{}} Assist_Tasks_Close_Session_DetailInputs */
/** @typedef {{}} Assist_Tasks_Confirm_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Confirm_Reply_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Confirm_Reply_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Confirming_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Reject_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Reject_Reply_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Reject_Reply_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Rejecting_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Show_Suggested_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Hide_Suggested_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Detail_Load_Failed_TitleInputs */
/** @typedef {{}} Assist_Tasks_Detail_Not_Found_DescInputs */
/** @typedef {{}} Assist_Tasks_Detail_Not_Found_TitleInputs */
/** @typedef {{}} Assist_Tasks_Empty_DescInputs */
/** @typedef {{}} Assist_Tasks_Empty_TitleInputs */
/** @typedef {{}} Assist_Tasks_Event_Detail_TitleInputs */
/** @typedef {{}} Assist_Tasks_Session_Detail_TitleInputs */
/** @typedef {{}} Assist_Tasks_Event_Load_FailedInputs */
/** @typedef {{}} Assist_Tasks_Filter_All_TypesInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_AllInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_IgnoredInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_LabelInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_PendingInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_ProcessingInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_ResolvedInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_Taken_OverInputs */
/** @typedef {{}} Assist_Tasks_Filter_Type_LabelInputs */
/** @typedef {{}} Assist_Tasks_IgnoreInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_ActionInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_DescInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_TitleInputs */
/** @typedef {{}} Assist_Tasks_Ignore_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Ignore_SuccessInputs */
/** @typedef {{}} Assist_Tasks_IgnoringInputs */
/** @typedef {{}} Assist_Tasks_List_TitleInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Messages_Load_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Message_Input_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Message_SendInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_PendingInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_SuccessInputs */
/** @typedef {{}} Assist_Tasks_No_MessagesInputs */
/** @typedef {{}} Assist_Tasks_No_OwnerInputs */
/** @typedef {{}} Assist_Tasks_No_Owner_ShortInputs */
/** @typedef {{}} Assist_Tasks_No_SummaryInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_DaysInputs */
/** @typedef {{}} Assist_Tasks_Overdue_DefaultInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_HoursInputs */
/** @typedef {{}} Assist_Tasks_Participant_Avatar_AltInputs */
/** @typedef {{}} Assist_Tasks_Review_ConfirmedInputs */
/** @typedef {{}} Assist_Tasks_Review_PendingInputs */
/** @typedef {{}} Assist_Tasks_Review_Taken_OverInputs */
/** @typedef {{}} Assist_Tasks_ResolveInputs */
/** @typedef {{}} Assist_Tasks_Resolve_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Resolve_PendingInputs */
/** @typedef {{}} Assist_Tasks_Resolve_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Save_PendingInputs */
/** @typedef {{}} Assist_Tasks_Save_Supplemental_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Save_Supplemental_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Search_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Supplemental_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_TakeoverInputs */
/** @typedef {{}} Assist_Tasks_Takeover_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Takeover_PendingInputs */
/** @typedef {{}} Assist_Tasks_Takeover_SuccessInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Timed_Out_CountInputs */
/** @typedef {{}} Assist_Tasks_Type_AdvertisementInputs */
/** @typedef {{}} Assist_Tasks_Type_Assign_RequestInputs */
/** @typedef {{}} Assist_Tasks_Type_Bug_ReportInputs */
/** @typedef {{}} Assist_Tasks_Type_Business_CooperationInputs */
/** @typedef {{}} Assist_Tasks_Type_Exception_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_FeedbackInputs */
/** @typedef {{}} Assist_Tasks_Type_Knowledge_RequestInputs */
/** @typedef {{}} Assist_Tasks_Type_Message_DeletionInputs */
/** @typedef {{}} Assist_Tasks_Type_Order_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_Payment_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_Product_FeedbackInputs */
/** @typedef {{}} Assist_Tasks_Type_UnknownInputs */
/** @typedef {{}} Assist_Tasks_Type_Unrecognized_InformationInputs */
/** @typedef {{}} Assist_Tasks_Type_Usage_IssueInputs */
/** @typedef {{}} Assist_Tasks_Unknown_ChannelInputs */
/** @typedef {{}} Assist_Tasks_Unnamed_TaskInputs */
/** @typedef {{}} Assist_Tasks_View_Adopted_KnowledgeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_View_Adopted_Knowledge_CountInputs */
/** @typedef {{ title: NonNullable<unknown> }} Assist_Tasks_View_ItemInputs */
/** @typedef {{}} Client_Chat_Attachment_AltInputs */
/** @typedef {{}} Client_Chat_Draft_SessionInputs */
/** @typedef {{}} Client_Chat_Draft_BadgeInputs */
/** @typedef {{}} Client_Chat_Loading_Session_TitleInputs */
/** @typedef {{}} Client_Chat_Empty_Brand_TitleInputs */
/** @typedef {{}} Client_Chat_Empty_SessionsInputs */
/** @typedef {{}} Client_Chat_Empty_Input_HintInputs */
/** @typedef {{ count: NonNullable<unknown> }} Client_Chat_Image_Count_LimitInputs */
/** @typedef {{}} Client_Chat_Image_OnlyInputs */
/** @typedef {{ size: NonNullable<unknown> }} Client_Chat_Image_Size_LimitInputs */
/** @typedef {{}} Client_Chat_History_SessionsInputs */
/** @typedef {{}} Client_Chat_Input_PlaceholderInputs */
/** @typedef {{}} Client_Chat_Load_Sessions_FailedInputs */
/** @typedef {{}} Client_Chat_Copy_MessageInputs */
/** @typedef {{}} Client_Chat_Copy_SuccessInputs */
/** @typedef {{}} Client_Chat_Copy_FailedInputs */
/** @typedef {{}} Client_Chat_Like_MessageInputs */
/** @typedef {{}} Client_Chat_Dislike_MessageInputs */
/** @typedef {{}} Client_Chat_Regenerate_MessageInputs */
/** @typedef {{}} Client_Chat_Lucius_NameInputs */
/** @typedef {{}} Client_Chat_MeInputs */
/** @typedef {{}} Client_Chat_More_ActionsInputs */
/** @typedef {{}} Client_Chat_New_SessionInputs */
/** @typedef {{}} Client_Chat_Next_PageInputs */
/** @typedef {{}} Client_Chat_No_MessagesInputs */
/** @typedef {{ page: NonNullable<unknown>, totalPages: NonNullable<unknown>, total: NonNullable<unknown> }} Client_Chat_Page_StatusInputs */
/** @typedef {{}} Client_Chat_Pin_SessionInputs */
/** @typedef {{}} Client_Chat_Preview_EmptyInputs */
/** @typedef {{}} Client_Chat_Preview_FallbackInputs */
/** @typedef {{}} Client_Chat_Preview_ImageInputs */
/** @typedef {{}} Client_Chat_Prev_PageInputs */
/** @typedef {{}} Client_Chat_Prompt_CapabilitiesInputs */
/** @typedef {{}} Client_Chat_Prompt_Invite_AgentInputs */
/** @typedef {{}} Client_Chat_Prompt_Role_DifferenceInputs */
/** @typedef {{}} Client_Chat_Prompt_Update_KnowledgeInputs */
/** @typedef {{ title: NonNullable<unknown> }} Client_Chat_Reply_Ready_DescriptionInputs */
/** @typedef {{}} Client_Chat_Reply_Ready_TitleInputs */
/** @typedef {{}} Client_Chat_ReplyingInputs */
/** @typedef {{}} Client_Chat_Remove_SessionInputs */
/** @typedef {{}} Client_Chat_Remove_Selected_ImageInputs */
/** @typedef {{}} Client_Chat_Rename_SessionInputs */
/** @typedef {{}} Client_Chat_Rename_Session_PromptInputs */
/** @typedef {{}} Client_Chat_SearchInputs */
/** @typedef {{}} Client_Chat_Search_EmptyInputs */
/** @typedef {{}} Client_Chat_Search_PlaceholderInputs */
/** @typedef {{}} Client_Chat_Search_TitleInputs */
/** @typedef {{}} Client_Chat_Select_CompanyInputs */
/** @typedef {{}} Client_Chat_Send_MessageInputs */
/** @typedef {{}} Client_Chat_Session_TodayInputs */
/** @typedef {{}} Client_Chat_Session_Week_AgoInputs */
/** @typedef {{}} Client_Chat_Session_YesterdayInputs */
/** @typedef {{}} Client_Chat_SendingInputs */
/** @typedef {{}} Client_Chat_Starred_SessionsInputs */
/** @typedef {{}} Client_Chat_SessionsInputs */
/** @typedef {{}} Client_Chat_TitleInputs */
/** @typedef {{}} Client_Chat_Unpin_SessionInputs */
/** @typedef {{}} Client_Chat_Upload_ImageInputs */
/** @typedef {{}} Client_Chat_User_FallbackInputs */
/** @typedef {{}} Client_Chat_View_ReplyInputs */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_CloseInputs */
/** @typedef {{}} Common_Coming_SoonInputs */
/** @typedef {{}} Common_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Hours_AgoInputs */
/** @typedef {{}} Common_Just_NowInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Minutes_AgoInputs */
/** @typedef {{}} Common_NextInputs */
/** @typedef {{}} Common_Next_StepInputs */
/** @typedef {{}} Common_RetryInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_UnknownInputs */
/** @typedef {{}} Pwa_Install_AppInputs */
/** @typedef {{}} Language_LabelInputs */
/** @typedef {{}} Language_ZhInputs */
/** @typedef {{}} Language_EnInputs */
/** @typedef {{}} Header_Action_FilesInputs */
/** @typedef {{}} Header_Action_MenuInputs */
/** @typedef {{}} Header_Action_NotificationsInputs */
/** @typedef {{}} Header_BrandInputs */
/** @typedef {{}} Sidebar_Group_ServersInputs */
/** @typedef {{}} Sidebar_Group_SessionsInputs */
/** @typedef {{}} Sidebar_Group_OrgInputs */
/** @typedef {{}} Sidebar_Group_Org_ShortInputs */
/** @typedef {{}} Sidebar_Item_ConversationInputs */
/** @typedef {{}} Sidebar_Item_Agent_ConfigInputs */
/** @typedef {{}} Sidebar_Item_User_PortraitInputs */
/** @typedef {{}} Sidebar_Item_Community_ProfileInputs */
/** @typedef {{}} Sidebar_Item_User_ListInputs */
/** @typedef {{}} Sidebar_Item_Assist_TasksInputs */
/** @typedef {{}} Sidebar_Item_All_SessionsInputs */
/** @typedef {{}} Sidebar_Item_Ad_ReviewInputs */
/** @typedef {{}} Sidebar_Item_Client_ChatInputs */
/** @typedef {{}} Sidebar_Item_Knowledge_BaseInputs */
/** @typedef {{}} Sidebar_Item_Daily_ReportInputs */
/** @typedef {{}} Sidebar_SettingsInputs */
/** @typedef {{}} Sidebar_Sign_OutInputs */
/** @typedef {{}} Sidebar_Not_Logged_InInputs */
/** @typedef {{}} Sidebar_Company_Not_FoundInputs */
/** @typedef {{}} Sidebar_Select_CompanyInputs */
/** @typedef {{ count: NonNullable<unknown> }} Sidebar_Servers_CountInputs */
/** @typedef {{}} Kb_TitleInputs */
/** @typedef {{}} Kb_Tab_AllInputs */
/** @typedef {{}} Kb_Tab_DocsInputs */
/** @typedef {{}} Kb_Search_PlaceholderInputs */
/** @typedef {{}} Kb_UploadInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Total_CountInputs */
/** @typedef {{}} Kb_Filter_SourceInputs */
/** @typedef {{}} Kb_EmptyInputs */
/** @typedef {{}} Kb_Pick_Company_FirstInputs */
/** @typedef {{ message: NonNullable<unknown> }} Kb_Load_ErrorInputs */
/** @typedef {{}} Kb_Menu_EditInputs */
/** @typedef {{}} Kb_Menu_DeleteInputs */
/** @typedef {{}} Kb_Source_Official_DocInputs */
/** @typedef {{}} Kb_Source_Session_RecordInputs */
/** @typedef {{}} Kb_Source_ManualInputs */
/** @typedef {{}} Kb_Unknown_TitleInputs */
/** @typedef {{}} Header_Collapse_SidebarInputs */
/** @typedef {{}} Header_Email_LoginInputs */
/** @typedef {{}} Header_Loading_AuthInputs */
/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown>, total: NonNullable<unknown> }} Header_RowsInputs */
/** @typedef {{}} Header_PrevInputs */
/** @typedef {{}} Header_NextInputs */
/** @typedef {{}} Header_Open_Action_MenuInputs */
/** @typedef {{}} Header_SettingsInputs */
/** @typedef {{}} Header_User_Avatar_AltInputs */
/** @typedef {{}} Kb_Doc_TitleInputs */
/** @typedef {{}} Kb_Doc_Generated_CountInputs */
/** @typedef {{}} Kb_Doc_UploaderInputs */
/** @typedef {{}} Kb_Doc_Uploaded_AtInputs */
/** @typedef {{}} Kb_Docs_EmptyInputs */
/** @typedef {{}} Kb_Upload_Doc_TabInputs */
/** @typedef {{}} Kb_Upload_Manual_TabInputs */
/** @typedef {{}} Kb_Upload_Manual_PlaceholderInputs */
/** @typedef {{}} Kb_Upload_Doc_TodoInputs */
/** @typedef {{}} Kb_Upload_CancelInputs */
/** @typedef {{}} Kb_Upload_SubmitInputs */
/** @typedef {{}} Kb_UploadingInputs */
/** @typedef {{}} Kb_Upload_Manual_RequiredInputs */
/** @typedef {{}} Kb_Upload_Doc_ClickInputs */
/** @typedef {{}} Kb_Upload_Doc_Drag_HintInputs */
/** @typedef {{}} Kb_Upload_Doc_Format_HintInputs */
/** @typedef {{}} Kb_Upload_Doc_RequiredInputs */
/** @typedef {{}} Kb_Upload_Doc_Missing_Document_IdInputs */
/** @typedef {{}} Kb_Upload_Doc_TimeoutInputs */
/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Doc_FailedInputs */
/** @typedef {{ name: NonNullable<unknown> }} Kb_Upload_Doc_SelectedInputs */
/** @typedef {{}} Kb_Edit_TitleInputs */
/** @typedef {{}} Kb_Edit_CloseInputs */
/** @typedef {{}} Kb_Edit_Label_TitleInputs */
/** @typedef {{}} Kb_Edit_Label_ContentInputs */
/** @typedef {{}} Kb_Edit_SaveInputs */
/** @typedef {{}} Kb_Edit_SavingInputs */
/** @typedef {{}} Kb_Edit_Missing_TargetInputs */
/** @typedef {{}} Kb_Edit_Title_RequiredInputs */
/** @typedef {{}} Kb_Edit_Content_RequiredInputs */
/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Progress_StatusInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Generated_CountInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Updated_CountInputs */
/** @typedef {{ index: NonNullable<unknown> }} Kb_Result_Chunk_PrefixInputs */
/** @typedef {{ document_id: NonNullable<unknown> }} Kb_Result_EmptyInputs */
/** @typedef {{}} Kb_Result_RegenerateInputs */
/** @typedef {{}} Kb_Result_RegeneratingInputs */
/** @typedef {{}} Kb_Result_ConfirmInputs */
/** @typedef {{}} Knowledge_Doc_Processing_TimeoutInputs */
/** @typedef {{}} Knowledge_Document_Status_Load_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunk_AttemptsInputs */
/** @typedef {{}} Knowledge_Failed_Chunk_Heading_FallbackInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_EmptyInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_Select_AllInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunks_Selected_CountInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_TitleInputs */
/** @typedef {{}} Knowledge_Retry_All_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Retry_Failed_Chunks_StartedInputs */
/** @typedef {{}} Knowledge_Retry_Selected_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Retry_Selected_Failed_Chunks_StartedInputs */
/** @typedef {{}} Knowledge_Retrying_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Upload_Progress_PrefixInputs */
/** @typedef {{}} Knowledge_Upload_Status_CompletedInputs */
/** @typedef {{}} Knowledge_Upload_Status_FailedInputs */
/** @typedef {{}} Knowledge_Upload_Status_ProcessingInputs */
/** @typedef {{}} Knowledge_Upload_Status_UploadingInputs */
/** @typedef {{}} Onboarding_Company_Init_ErrorInputs */
/** @typedef {{}} Onboarding_Company_Load_ErrorInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Onboarding_Company_Name_Length_ErrorInputs */
/** @typedef {{}} Onboarding_Company_Name_LabelInputs */
/** @typedef {{}} Onboarding_Company_Name_PlaceholderInputs */
/** @typedef {{}} Onboarding_Company_Description_LabelInputs */
/** @typedef {{}} Onboarding_Company_Description_PlaceholderInputs */
/** @typedef {{}} Onboarding_Company_Save_ErrorInputs */
/** @typedef {{}} Onboarding_Company_SavedInputs */
/** @typedef {{}} Onboarding_Company_Setup_SubtitleInputs */
/** @typedef {{}} Onboarding_Company_Setup_TitleInputs */
/** @typedef {{}} Onboarding_Company_Submit_Create_ContinueInputs */
/** @typedef {{}} Onboarding_Company_Submit_NextInputs */
/** @typedef {{}} Onboarding_Company_Website_LabelInputs */
/** @typedef {{}} Onboarding_Company_Welcome_SubtitleInputs */
/** @typedef {{}} Onboarding_Company_Welcome_TitleInputs */
/** @typedef {{}} Onboarding_Profile_Gate_ErrorInputs */
/** @typedef {{}} Profile_Avatar_Must_Be_ImageInputs */
/** @typedef {{}} Profile_Avatar_Preview_AltInputs */
/** @typedef {{ size: NonNullable<unknown> }} Profile_Avatar_Size_LimitInputs */
/** @typedef {{}} Profile_Choose_AvatarInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Display_Name_Length_ErrorInputs */
/** @typedef {{}} Profile_Enter_NicknameInputs */
/** @typedef {{}} Profile_Init_FailedInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Nickname_HintInputs */
/** @typedef {{}} Profile_Nickname_LabelInputs */
/** @typedef {{}} Profile_Nickname_PlaceholderInputs */
/** @typedef {{}} Profile_Required_Display_NameInputs */
/** @typedef {{}} Profile_Save_ErrorInputs */
/** @typedef {{}} Profile_Save_SuccessInputs */
/** @typedef {{}} Profile_Platform_Accounts_TitleInputs */
/** @typedef {{}} Profile_Platform_Account_ConnectInputs */
/** @typedef {{}} Profile_Platform_Account_DisconnectInputs */
/** @typedef {{}} Profile_Platform_Account_UnavailableInputs */
/** @typedef {{}} Platform_DiscordInputs */
/** @typedef {{}} Platform_FeishuInputs */
/** @typedef {{}} Platform_SlackInputs */
/** @typedef {{}} Platform_TelegramInputs */
/** @typedef {{}} Platform_UnknownInputs */
/** @typedef {{}} Role_AdminInputs */
/** @typedef {{}} Role_AssistantInputs */
/** @typedef {{}} Role_BotInputs */
/** @typedef {{}} Role_LuciusInputs */
/** @typedef {{}} Role_StaffInputs */
/** @typedef {{}} Role_UnknownInputs */
/** @typedef {{}} Role_UserInputs */
/** @typedef {{}} Settings_Back_To_AppInputs */
/** @typedef {{}} Settings_Nav_Event_SettingsInputs */
/** @typedef {{}} Settings_Nav_ManagementInputs */
/** @typedef {{}} Settings_Nav_Member_ManagementInputs */
/** @typedef {{}} Settings_Nav_PackageInputs */
/** @typedef {{}} Settings_Nav_Profile_SettingsInputs */
/** @typedef {{}} Settings_Nav_Usage_HistoryInputs */
/** @typedef {{}} Settings_Nav_User_CommunitiesInputs */
/** @typedef {{}} Settings_Nav_Workgroup_SettingsInputs */
/** @typedef {{}} Settings_Select_Company_FirstInputs */
/** @typedef {{}} Settings_TitleInputs */
/** @typedef {{}} Common_AddInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Days_AgoInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_EditInputs */
/** @typedef {{}} Common_NoneInputs */
/** @typedef {{}} Common_OpenInputs */
/** @typedef {{}} Common_PreviousInputs */
/** @typedef {{}} Common_RefreshInputs */
/** @typedef {{}} Common_RefreshingInputs */
/** @typedef {{}} Common_Unknown_UserInputs */
/** @typedef {{}} Platform_WebsiteInputs */
/** @typedef {{}} Role_MemberInputs */
/** @typedef {{}} Role_OwnerInputs */
/** @typedef {{}} Workspace_Settings_TitleInputs */
/** @typedef {{}} Workspace_State_ReadyInputs */
/** @typedef {{}} Workspace_State_Needs_ConnectionInputs */
/** @typedef {{}} Workspace_State_UnavailableInputs */
/** @typedef {{}} Workspace_Empty_ReadyInputs */
/** @typedef {{}} Workspace_Empty_UnavailableInputs */
/** @typedef {{}} Workspace_Empty_Needs_ConnectionInputs */
/** @typedef {{}} Workspace_StaleInputs */
/** @typedef {{}} Workspace_Save_PendingInputs */
/** @typedef {{}} Workspace_BadgeInputs */
/** @typedef {{}} Workspace_RemoveInputs */
/** @typedef {{}} Workspace_SetInputs */
/** @typedef {{}} Workspace_ReadonlyInputs */
/** @typedef {{}} Workspace_Navigate_Platform_SettingsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workspace_Selected_CountInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workspace_Add_SuccessInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workspace_Remove_SuccessInputs */
/** @typedef {{}} Workspace_Select_Company_ErrorInputs */
/** @typedef {{}} Workspace_Permission_ErrorInputs */
/** @typedef {{}} Workspace_Save_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workspace_Summary_SelectedInputs */
/** @typedef {{}} Workspace_Summary_DescriptionInputs */
/** @typedef {{}} Workspace_Permission_EditableInputs */
/** @typedef {{}} Workspace_Permission_ReadonlyInputs */
/** @typedef {{}} Workspace_Member_Readonly_HintInputs */
/** @typedef {{}} Feishu_Settings_TitleInputs */
/** @typedef {{}} Feishu_Default_Chat_TypeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Discovered_CandidatesInputs */
/** @typedef {{}} Feishu_No_Available_CandidatesInputs */
/** @typedef {{}} Feishu_Synced_HintInputs */
/** @typedef {{}} Feishu_Manage_HintInputs */
/** @typedef {{}} Feishu_Readonly_HintInputs */
/** @typedef {{}} Feishu_Empty_SyncedInputs */
/** @typedef {{}} Feishu_Bot_Add_ButtonInputs */
/** @typedef {{}} Feishu_Bot_Summary_Connected_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Connected_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Default_TitleInputs */
/** @typedef {{}} Feishu_Bot_Summary_Default_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Channels_Bound_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Channels_Bound_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Last_Error_TitleInputs */
/** @typedef {{}} Feishu_Bot_Summary_Last_Error_HintInputs */
/** @typedef {{}} Feishu_Bot_Member_Readonly_HintInputs */
/** @typedef {{}} Feishu_Bot_Empty_TitleInputs */
/** @typedef {{}} Feishu_Bot_Empty_Manage_HintInputs */
/** @typedef {{}} Feishu_Bot_Empty_Readonly_HintInputs */
/** @typedef {{}} Feishu_Bot_Dialog_Create_TitleInputs */
/** @typedef {{}} Feishu_Bot_Dialog_Edit_TitleInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_Default_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Enabled_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HintInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_ShowInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HideInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_SubmittingInputs */
/** @typedef {{}} Feishu_Bot_CreateInputs */
/** @typedef {{}} Feishu_Bot_Default_BadgeInputs */
/** @typedef {{}} Feishu_Bot_Status_ActiveInputs */
/** @typedef {{}} Feishu_Bot_Status_DisabledInputs */
/** @typedef {{}} Feishu_Bot_Status_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Status_PendingInputs */
/** @typedef {{}} Feishu_Bot_Action_VerifyInputs */
/** @typedef {{}} Feishu_Bot_Action_VerifyingInputs */
/** @typedef {{}} Feishu_Bot_Action_RestartInputs */
/** @typedef {{}} Feishu_Bot_Action_RestartingInputs */
/** @typedef {{}} Feishu_Bot_Action_EnableInputs */
/** @typedef {{}} Feishu_Bot_Action_DisableInputs */
/** @typedef {{}} Feishu_Bot_Action_UpdatingInputs */
/** @typedef {{}} Feishu_Bot_Meta_Verified_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Connected_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Heartbeat_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Event_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_NeverInputs */
/** @typedef {{}} Feishu_Bot_Last_Error_LabelInputs */
/** @typedef {{}} Feishu_Bot_Assigned_Channels_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Assigned_Channels_CountInputs */
/** @typedef {{}} Feishu_Bot_Assigned_Channels_EmptyInputs */
/** @typedef {{}} Feishu_Bot_Create_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Update_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Save_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Verify_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Verify_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Enable_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Enable_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Restart_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Restart_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Disable_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Disable_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Restart_Confirm_TitleInputs */
/** @typedef {{}} Feishu_Bot_Restart_Confirm_DescriptionInputs */
/** @typedef {{}} Feishu_Bot_Disable_Confirm_TitleInputs */
/** @typedef {{}} Feishu_Bot_Disable_Confirm_DescriptionInputs */
/** @typedef {{}} Billing_Usage_TitleInputs */
/** @typedef {{}} Billing_Current_PeriodInputs */
/** @typedef {{ key: NonNullable<unknown> }} Billing_Period_KeyInputs */
/** @typedef {{}} Billing_Period_Key_LaterInputs */
/** @typedef {{}} Billing_Used_Actions_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Blocked_ActionsInputs */
/** @typedef {{}} Billing_No_Blocked_ActionsInputs */
/** @typedef {{}} Billing_Overage_TitleInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Projected_OverageInputs */
/** @typedef {{}} Billing_No_Overage_YetInputs */
/** @typedef {{}} Billing_State_TitleInputs */
/** @typedef {{}} Billing_Estimated_Invoice_TitleInputs */
/** @typedef {{}} Billing_Auto_ChargeInputs */
/** @typedef {{}} Billing_Stop_ServiceInputs */
/** @typedef {{}} Billing_Stripe_Invoices_TitleInputs */
/** @typedef {{}} Billing_Stripe_Invoices_HintInputs */
/** @typedef {{}} Billing_Stripe_EmptyInputs */
/** @typedef {{}} Billing_Snapshot_TitleInputs */
/** @typedef {{}} Billing_Snapshot_HintInputs */
/** @typedef {{}} Billing_Snapshot_Export_TitleInputs */
/** @typedef {{}} Billing_Snapshot_ExportInputs */
/** @typedef {{}} Billing_Table_ProjectInputs */
/** @typedef {{}} Billing_Table_QuantityInputs */
/** @typedef {{}} Billing_Table_Unit_PriceInputs */
/** @typedef {{}} Billing_Table_AmountInputs */
/** @typedef {{}} Billing_Estimated_TotalInputs */
/** @typedef {{}} Billing_Period_Export_HintInputs */
/** @typedef {{}} Billing_Export_SuccessInputs */
/** @typedef {{}} Billing_Export_ErrorInputs */
/** @typedef {{}} Billing_Invoice_Status_PaidInputs */
/** @typedef {{}} Billing_Invoice_Status_OpenInputs */
/** @typedef {{}} Billing_Invoice_Status_VoidInputs */
/** @typedef {{}} Billing_Invoice_Status_UncollectibleInputs */
/** @typedef {{}} Billing_Invoice_Status_DraftInputs */
/** @typedef {{}} Billing_Invoice_Status_UnknownInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Created_OnInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Paid_OnInputs */
/** @typedef {{}} Billing_View_InvoiceInputs */
/** @typedef {{}} Billing_Download_InvoiceInputs */
/** @typedef {{}} Billing_Download_ReceiptInputs */
/** @typedef {{}} Billing_Plan_TitleInputs */
/** @typedef {{}} Billing_Display_Free_ActiveInputs */
/** @typedef {{}} Billing_Display_Free_Limit_ReachedInputs */
/** @typedef {{}} Billing_Display_Basic_TrialInputs */
/** @typedef {{}} Billing_Display_Basic_ActiveInputs */
/** @typedef {{}} Billing_Display_Basic_CancelingInputs */
/** @typedef {{}} Billing_Display_Pro_TrialInputs */
/** @typedef {{}} Billing_Display_Pro_ActiveInputs */
/** @typedef {{}} Billing_Display_Pro_CancelingInputs */
/** @typedef {{}} Billing_Display_Promo_Only_BasicInputs */
/** @typedef {{}} Billing_Display_Past_DueInputs */
/** @typedef {{}} Billing_Display_ExpiredInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Trial_Ends_OnInputs */
/** @typedef {{}} Billing_TrialingInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Ends_OnInputs */
/** @typedef {{}} Billing_Stop_After_PeriodInputs */
/** @typedef {{}} Billing_Limit_ReachedInputs */
/** @typedef {{}} Billing_Current_Period_NormalInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Next_BillingInputs */
/** @typedef {{}} Billing_Current_WorkspaceInputs */
/** @typedef {{}} Billing_Start_Basic_TrialInputs */
/** @typedef {{}} Billing_Start_Pro_TrialInputs */
/** @typedef {{}} Billing_Manage_Payment_MethodInputs */
/** @typedef {{}} Billing_Account_LabelInputs */
/** @typedef {{}} Billing_Metric_ProjectedInputs */
/** @typedef {{}} Billing_Metric_AdminsInputs */
/** @typedef {{}} Billing_Metric_PlatformsInputs */
/** @typedef {{}} Billing_Metric_OverageInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Monthly_PriceInputs */
/** @typedef {{}} Billing_Actions_LabelInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Actions_Included_MonthInputs */
/** @typedef {{ count: NonNullable<unknown>, amount: NonNullable<unknown> }} Billing_Overage_SummaryInputs */
/** @typedef {{}} Billing_No_Overage_FeeInputs */
/** @typedef {{ percent: NonNullable<unknown> }} Billing_Usage_RateInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_AdminInputs */
/** @typedef {{}} Billing_No_Extra_AdminInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_PlatformInputs */
/** @typedef {{}} Billing_No_Extra_PlatformInputs */
/** @typedef {{}} Billing_Overage_Policy_TitleInputs */
/** @typedef {{}} Billing_Overage_Policy_SubtitleInputs */
/** @typedef {{}} Billing_Free_Fixed_Stop_ServiceInputs */
/** @typedef {{}} Billing_Policy_Stop_Service_TitleInputs */
/** @typedef {{}} Billing_Policy_Stop_Service_DescInputs */
/** @typedef {{}} Billing_Policy_Auto_Charge_TitleInputs */
/** @typedef {{}} Billing_Policy_Auto_Charge_DescInputs */
/** @typedef {{}} Billing_Monthly_Overage_CapInputs */
/** @typedef {{}} Billing_Example_CapInputs */
/** @typedef {{}} Billing_Save_PolicyInputs */
/** @typedef {{}} Billing_Current_PlanInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Overage_Per_ActionInputs */
/** @typedef {{}} Billing_UnsupportedInputs */
/** @typedef {{ platform: NonNullable<unknown>, admin: NonNullable<unknown> }} Billing_Addon_SummaryInputs */
/** @typedef {{}} Billing_Start_TrialInputs */
/** @typedef {{}} Member_Management_TitleInputs */
/** @typedef {{}} Member_Management_Add_MemberInputs */
/** @typedef {{}} Member_Management_Table_IdInputs */
/** @typedef {{}} Member_Management_Table_PlatformsInputs */
/** @typedef {{}} Member_Management_Table_RoleInputs */
/** @typedef {{}} Member_Management_Table_Recent_ActivityInputs */
/** @typedef {{}} Member_Management_Table_ActionsInputs */
/** @typedef {{}} Member_Management_Remove_Current_UserInputs */
/** @typedef {{}} Member_Management_Remove_OwnerInputs */
/** @typedef {{}} Member_Management_Admin_Cancel_Member_Invite_OnlyInputs */
/** @typedef {{}} Member_Management_Admin_Remove_Member_OnlyInputs */
/** @typedef {{}} Member_Management_Owner_Only_ActionInputs */
/** @typedef {{}} Member_Management_Menu_Hint_Current_AccountInputs */
/** @typedef {{}} Member_Management_Menu_Hint_OwnerInputs */
/** @typedef {{}} Member_Management_Menu_Hint_No_PermissionInputs */
/** @typedef {{}} Member_Management_Update_Current_User_RoleInputs */
/** @typedef {{}} Member_Management_Update_Owner_RoleInputs */
/** @typedef {{}} Member_Management_Admin_Update_Member_Invite_OnlyInputs */
/** @typedef {{}} Member_Management_Admin_Update_Member_OnlyInputs */
/** @typedef {{}} Member_Management_Status_InvitedInputs */
/** @typedef {{}} Member_Management_Status_JoinedInputs */
/** @typedef {{}} Member_Management_Recent_Pending_JoinInputs */
/** @typedef {{}} Member_Management_Recent_UnrecordedInputs */
/** @typedef {{}} Member_Management_Fallback_NameInputs */
/** @typedef {{}} Member_Management_Invalid_EmailInputs */
/** @typedef {{}} Member_Management_Invite_ErrorInputs */
/** @typedef {{}} Member_Management_Role_Update_ErrorInputs */
/** @typedef {{}} Member_Management_Resend_ErrorInputs */
/** @typedef {{}} Member_Management_Link_Telegram_ErrorInputs */
/** @typedef {{}} Member_Management_Missing_Current_Member_BindInputs */
/** @typedef {{}} Member_Management_Link_Platform_ErrorInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_BoundInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_Bind_FailedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_UnlinkedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Oauth_Link_HintInputs */
/** @typedef {{}} Member_Management_Missing_Current_Member_UnbindInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_Platform_ErrorInputs */
/** @typedef {{}} Member_Management_Cancel_InviteInputs */
/** @typedef {{}} Member_Management_Remove_MemberInputs */
/** @typedef {{}} Member_Management_Actions_TitleInputs */
/** @typedef {{ email: NonNullable<unknown> }} Member_Management_Actions_Menu_AriaInputs */
/** @typedef {{ accounts: NonNullable<unknown> }} Member_Management_Accounts_LabelInputs */
/** @typedef {{}} Member_Management_UnlinkedInputs */
/** @typedef {{}} Member_Management_Adjust_Invite_RoleInputs */
/** @typedef {{}} Member_Management_Change_RoleInputs */
/** @typedef {{}} Member_Management_Resending_InviteInputs */
/** @typedef {{}} Member_Management_Resend_InviteInputs */
/** @typedef {{}} Member_Management_My_BindingsInputs */
/** @typedef {{}} Member_Management_No_Current_MemberInputs */
/** @typedef {{}} Member_Management_Linked_PlatformsInputs */
/** @typedef {{}} Member_Management_Telegram_LinkedInputs */
/** @typedef {{}} Member_Management_Telegram_UnlinkedInputs */
/** @typedef {{}} Member_Management_Telegram_UnavailableInputs */
/** @typedef {{}} Member_Management_UnlinkingInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_PlatformInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Login_And_LinkInputs */
/** @typedef {{}} Member_Management_LinkingInputs */
/** @typedef {{}} Member_Management_Binding_WaitInputs */
/** @typedef {{}} Member_Management_Invite_Dialog_TitleInputs */
/** @typedef {{}} Member_Management_Invite_Dialog_DescInputs */
/** @typedef {{}} Member_Management_Invite_Mode_LabelInputs */
/** @typedef {{}} Member_Management_Invite_Mode_EmailInputs */
/** @typedef {{}} Member_Management_Invite_Mode_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Mode_Link_HintInputs */
/** @typedef {{}} Member_Management_Email_LabelInputs */
/** @typedef {{}} Member_Management_Role_LabelInputs */
/** @typedef {{}} Member_Management_Role_PlaceholderInputs */
/** @typedef {{}} Member_Management_Generate_Invite_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Link_GeneratingInputs */
/** @typedef {{}} Member_Management_Copy_Invite_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Link_LabelInputs */
/** @typedef {{}} Member_Management_Invite_Link_CopiedInputs */
/** @typedef {{}} Member_Management_Invite_Link_ErrorInputs */
/** @typedef {{}} Member_Management_Invite_Link_Copy_FailedInputs */
/** @typedef {{}} Member_Management_Send_InviteInputs */
/** @typedef {{}} Member_Management_Sending_InviteInputs */
/** @typedef {{ email: NonNullable<unknown>, role: NonNullable<unknown> }} Member_Management_Role_Dialog_DescInputs */
/** @typedef {{}} Member_Management_Role_Dialog_Empty_DescInputs */
/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_UpdateInputs */
/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_InviteInputs */
/** @typedef {{}} Member_Management_Admin_Quota_HintInputs */
/** @typedef {{ name: NonNullable<unknown> }} Member_Management_Avatar_AltInputs */
/** @typedef {{}} Member_Management_Save_RoleInputs */
/** @typedef {{}} Member_Invite_Invalid_TitleInputs */
/** @typedef {{}} Member_Invite_Invalid_DescInputs */
/** @typedef {{}} Member_Invite_Switch_Account_ErrorInputs */
/** @typedef {{}} Member_Invite_Accept_ErrorInputs */
/** @typedef {{}} Member_Invite_BadgeInputs */
/** @typedef {{ role: NonNullable<unknown> }} Member_Invite_SummaryInputs */
/** @typedef {{}} Member_Invite_Role_LabelInputs */
/** @typedef {{}} Member_Invite_Expiry_LabelInputs */
/** @typedef {{}} Member_Invite_Status_LabelInputs */
/** @typedef {{}} Member_Invite_Joined_TitleInputs */
/** @typedef {{}} Member_Invite_Joined_DescInputs */
/** @typedef {{}} Member_Invite_Joined_BadgeInputs */
/** @typedef {{}} Member_Invite_Expired_TitleInputs */
/** @typedef {{}} Member_Invite_Expired_DescInputs */
/** @typedef {{}} Member_Invite_Cancelled_TitleInputs */
/** @typedef {{}} Member_Invite_Cancelled_DescInputs */
/** @typedef {{}} Member_Invite_Used_TitleInputs */
/** @typedef {{}} Member_Invite_Used_DescInputs */
/** @typedef {{}} Member_Invite_Email_Mismatch_TitleInputs */
/** @typedef {{ email: NonNullable<unknown> }} Member_Invite_Email_Mismatch_DescInputs */
/** @typedef {{}} Member_Invite_Ready_TitleInputs */
/** @typedef {{}} Member_Invite_Ready_DescInputs */
/** @typedef {{}} Member_Invite_Login_TitleInputs */
/** @typedef {{}} Member_Invite_Login_DescInputs */
/** @typedef {{}} Member_Invite_Open_WorkspaceInputs */
/** @typedef {{}} Member_Invite_Switching_AccountInputs */
/** @typedef {{}} Member_Invite_Switch_AccountInputs */
/** @typedef {{}} Member_Invite_AcceptingInputs */
/** @typedef {{}} Member_Invite_Accept_ActionInputs */
/** @typedef {{}} Member_Invite_Login_ActionInputs */
/** @typedef {{}} Member_Invite_Back_DashboardInputs */
/** @typedef {{}} Telegram_Widget_Load_ErrorInputs */
/** @typedef {{}} Telegram_Settings_GroupInputs */
/** @typedef {{}} Telegram_Settings_SupergroupInputs */
/** @typedef {{}} Telegram_Settings_ChannelInputs */
/** @typedef {{}} Telegram_Settings_PrivateInputs */
/** @typedef {{}} Telegram_Settings_UnknownInputs */
/** @typedef {{}} Telegram_Settings_Status_PendingInputs */
/** @typedef {{}} Telegram_Settings_Status_FulfilledInputs */
/** @typedef {{}} Telegram_Settings_Status_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Status_CancelledInputs */
/** @typedef {{}} Telegram_Settings_Status_FailedInputs */
/** @typedef {{}} Telegram_Settings_Load_Config_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Load_Bound_Channels_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Load_Candidates_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Session_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Select_Company_TopInputs */
/** @typedef {{}} Telegram_Settings_Login_SuccessInputs */
/** @typedef {{}} Telegram_Settings_Create_Session_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Create_Binding_Intent_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Auto_Bind_Success_NamedInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_SuccessInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_IncompleteInputs */
/** @typedef {{}} Telegram_Settings_Poll_Status_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Select_Company_FirstInputs */
/** @typedef {{}} Telegram_Settings_Open_Telegram_ConfirmInputs */
/** @typedef {{}} Telegram_Settings_Login_FirstInputs */
/** @typedef {{}} Telegram_Settings_Open_Telegram_Add_BotInputs */
/** @typedef {{}} Telegram_Settings_Add_CommunityInputs */
/** @typedef {{}} Telegram_Settings_Empty_With_CompanyInputs */
/** @typedef {{}} Telegram_Settings_Empty_Without_CompanyInputs */
/** @typedef {{}} Telegram_Settings_Dialog_TitleInputs */
/** @typedef {{}} Telegram_Settings_Step_LoginInputs */
/** @typedef {{}} Telegram_Settings_LoginInputs */
/** @typedef {{}} Telegram_Settings_Logging_InInputs */
/** @typedef {{}} Telegram_Settings_Integration_DisabledInputs */
/** @typedef {{}} Telegram_Settings_Verifying_LoginInputs */
/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_NameInputs */
/** @typedef {{ name: NonNullable<unknown>, username: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_UsernameInputs */
/** @typedef {{}} Telegram_Settings_Step_Add_BotInputs */
/** @typedef {{ username: NonNullable<unknown> }} Telegram_Settings_Add_Bot_ButtonInputs */
/** @typedef {{}} Telegram_Settings_Step_Sync_CommunitiesInputs */
/** @typedef {{}} Telegram_Settings_Refresh_CommunitiesInputs */
/** @typedef {{}} Event_Settings_TitleInputs */
/** @typedef {{}} Event_Settings_Select_Company_FirstInputs */
/** @typedef {{}} Event_Settings_Add_TypeInputs */
/** @typedef {{}} Event_Settings_Trigger_Select_OwnerInputs */
/** @typedef {{}} Event_Settings_Trigger_Owner_UnboundInputs */
/** @typedef {{}} Event_Settings_Trigger_No_ChannelsInputs */
/** @typedef {{}} Event_Settings_Trigger_Select_ChannelInputs */
/** @typedef {{}} Event_Settings_Back_To_ListInputs */
/** @typedef {{}} Event_Settings_Detail_Title_NewInputs */
/** @typedef {{ name: NonNullable<unknown> }} Event_Settings_Detail_Title_ExistingInputs */
/** @typedef {{}} Event_Settings_Detail_Title_DefaultInputs */
/** @typedef {{}} Event_Settings_Type_Not_FoundInputs */
/** @typedef {{}} Event_Settings_Label_Type_KeyInputs */
/** @typedef {{}} Event_Settings_Label_Type_NameInputs */
/** @typedef {{}} Event_Settings_Label_Type_DescriptionInputs */
/** @typedef {{}} Event_Settings_Label_ResponsibleInputs */
/** @typedef {{}} Event_Settings_Select_ResponsibleInputs */
/** @typedef {{}} Event_Settings_Member_List_LabelInputs */
/** @typedef {{}} Event_Settings_No_MembersInputs */
/** @typedef {{ accounts: NonNullable<unknown> }} Event_Settings_Bound_AccountsInputs */
/** @typedef {{}} Event_Settings_Unbound_AccountsInputs */
/** @typedef {{}} Event_Settings_Label_Platform_ChannelsInputs */
/** @typedef {{}} Event_Settings_Platform_Channel_ListInputs */
/** @typedef {{}} Event_Settings_No_ChannelsInputs */
/** @typedef {{}} Event_Settings_Label_Send_NotificationInputs */
/** @typedef {{}} Event_Settings_Notify_Disabled_HintInputs */
/** @typedef {{}} Event_Settings_Notification_TargetsInputs */
/** @typedef {{}} Event_Settings_Notification_Targets_EmptyInputs */
/** @typedef {{}} Event_Settings_List_TitleInputs */
/** @typedef {{}} Event_Settings_List_EmptyInputs */
/** @typedef {{}} Event_Settings_System_BadgeInputs */
/** @typedef {{}} Event_Settings_Unnamed_TypeInputs */
/** @typedef {{}} Event_Type_Label_Exception_IssueInputs */
/** @typedef {{}} Event_Type_Label_Usage_IssueInputs */
/** @typedef {{}} Event_Type_Label_Order_IssueInputs */
/** @typedef {{}} Event_Type_Label_Business_CooperationInputs */
/** @typedef {{}} Event_Type_Label_Product_FeedbackInputs */
/** @typedef {{}} Event_Type_Label_Unrecognized_InformationInputs */
/** @typedef {{}} Event_Type_Label_AdvertisementInputs */
/** @typedef {{}} Event_Type_Label_Message_DeletionInputs */
/** @typedef {{}} Event_Settings_Read_Members_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Bindings_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Type_Config_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Notification_Target_ErrorInputs */
/** @typedef {{}} Event_Settings_Invalid_Type_KeyInputs */
/** @typedef {{}} Event_Settings_Type_Name_RequiredInputs */
/** @typedef {{}} Event_Settings_Missing_Type_Config_MigrationInputs */
/** @typedef {{}} Event_Settings_Save_Type_Config_ErrorInputs */
/** @typedef {{}} Event_Settings_Missing_Saved_Config_IdInputs */
/** @typedef {{}} Event_Settings_Members_Not_LoadedInputs */
/** @typedef {{}} Event_Settings_Channels_Not_LoadedInputs */
/** @typedef {{}} Event_Settings_Clear_Targets_ErrorInputs */
/** @typedef {{}} Event_Settings_Write_Target_ErrorInputs */
/** @typedef {{}} Event_Settings_SavedInputs */
/** @typedef {{}} Event_Settings_Save_ErrorInputs */
/** @typedef {{}} Event_Settings_Notify_OffInputs */
/** @typedef {{}} Event_Settings_Notify_OnInputs */
/** @typedef {{}} Integration_Status_Not_ConnectedInputs */
/** @typedef {{}} Integration_Status_Degraded_RetryInputs */
/** @typedef {{}} Integration_Status_ConnectedInputs */
/** @typedef {{}} Integration_Status_DisabledInputs */
/** @typedef {{}} Integration_Sync_SuccessInputs */
/** @typedef {{ channels: NonNullable<unknown>, roles: NonNullable<unknown> }} Integration_Sync_Success_Channels_RolesInputs */
/** @typedef {{ channels: NonNullable<unknown> }} Integration_Sync_Success_ChannelsInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_SuccessInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_DegradedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Create_Install_ErrorInputs */
/** @typedef {{}} Integration_Manual_Sync_ErrorInputs */
/** @typedef {{}} Integration_Owner_Admin_OnlyInputs */
/** @typedef {{}} Integration_Add_CommunityInputs */
/** @typedef {{}} Integration_Empty_With_CompanyInputs */
/** @typedef {{}} Integration_Empty_Without_CompanyInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Dialog_TitleInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Step_ConnectInputs */
/** @typedef {{}} Integration_Step_SyncInputs */
/** @typedef {{}} Integration_Step_RefreshInputs */
/** @typedef {{}} Integration_Creating_Install_LinkInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_ReconnectInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_ConnectInputs */
/** @typedef {{}} Integration_SyncingInputs */
/** @typedef {{}} Integration_Manual_SyncInputs */
/** @typedef {{}} Integration_Refresh_CommunitiesInputs */
/** @typedef {{}} Discord_Channel_TextInputs */
/** @typedef {{}} Discord_Channel_VoiceInputs */
/** @typedef {{}} Discord_Channel_CategoryInputs */
/** @typedef {{}} Discord_Channel_AnnouncementInputs */
/** @typedef {{}} Discord_Channel_StageInputs */
/** @typedef {{}} Discord_Channel_ForumInputs */
/** @typedef {{}} Discord_Channel_DefaultInputs */
/** @typedef {{}} Slack_Channel_PrivateInputs */
/** @typedef {{}} Slack_Channel_PublicInputs */
/** @typedef {{}} Slack_Channel_Direct_MessageInputs */
/** @typedef {{}} Slack_Channel_Multi_Person_DmInputs */
/** @typedef {{}} Slack_Channel_GroupInputs */
/** @typedef {{}} Slack_Channel_DefaultInputs */
/** @typedef {{}} Settings_Remove_Member_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Knowledge_Upload_CompletedInputs */
/** @typedef {{ url: NonNullable<unknown> }} Knowledge_Web_Crawl_CompletedInputs */
/** @typedef {{}} Knowledge_Close_Result_PanelInputs */
/** @typedef {{}} Knowledge_Close_Detail_PopupInputs */
/** @typedef {{}} Knowledge_Close_Document_PopupInputs */
/** @typedef {{}} Knowledge_Chunk_ListInputs */
/** @typedef {{}} Knowledge_Close_Image_PreviewInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_ActionInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_Desc_PrefixInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_TitleInputs */
/** @typedef {{}} Knowledge_Delete_FailedInputs */
/** @typedef {{}} Knowledge_DeletingInputs */
/** @typedef {{}} Knowledge_Doc_Insight_TitleInputs */
/** @typedef {{}} Knowledge_Doc_TitleInputs */
/** @typedef {{}} Knowledge_Generated_CountInputs */
/** @typedef {{}} Knowledge_Image_AttachmentsInputs */
/** @typedef {{}} Knowledge_Image_Preview_HintInputs */
/** @typedef {{}} Knowledge_Load_Attachments_FailedInputs */
/** @typedef {{}} Knowledge_Load_Chunks_FailedInputs */
/** @typedef {{}} Knowledge_Manual_Knowledge_PrefixInputs */
/** @typedef {{}} Knowledge_No_Chunk_DataInputs */
/** @typedef {{}} Knowledge_No_Image_AttachmentsInputs */
/** @typedef {{}} Knowledge_No_Source_Document_UrlInputs */
/** @typedef {{}} Knowledge_PreviewInputs */
/** @typedef {{}} Knowledge_Role_AssistantInputs */
/** @typedef {{}} Knowledge_Role_UserInputs */
/** @typedef {{}} Knowledge_Search_PlaceholderInputs */
/** @typedef {{}} Knowledge_Session_Not_FoundInputs */
/** @typedef {{}} Knowledge_Source_FilterInputs */
/** @typedef {{}} Knowledge_Source_ManualInputs */
/** @typedef {{}} Knowledge_Source_Official_DocInputs */
/** @typedef {{}} Knowledge_Source_Web_CrawlInputs */
/** @typedef {{}} Knowledge_Source_Session_RecordInputs */
/** @typedef {{}} Knowledge_Source_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_HintInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Max_Depth_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Max_Pages_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_TabInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_PlaceholderInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_RequiredInputs */
/** @typedef {{}} Knowledge_Tab_DocsInputs */
/** @typedef {{}} Knowledge_Tab_ItemsInputs */
/** @typedef {{}} Knowledge_Total_Count_PrefixInputs */
/** @typedef {{}} Knowledge_Total_Count_SuffixInputs */
/** @typedef {{}} Knowledge_Total_PrefixInputs */
/** @typedef {{}} Knowledge_Type_SizeInputs */
/** @typedef {{}} Knowledge_Upload_Dialog_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Doc_ClickInputs */
/** @typedef {{}} Knowledge_Upload_Doc_Drag_HintInputs */
/** @typedef {{}} Knowledge_Upload_Doc_Format_HintInputs */
/** @typedef {{}} Knowledge_Upload_Doc_TabInputs */
/** @typedef {{}} Knowledge_Upload_KnowledgeInputs */
/** @typedef {{}} Knowledge_Upload_Manual_TabInputs */
/** @typedef {{}} Knowledge_Upload_Selected_Files_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Selected_PrefixInputs */
/** @typedef {{}} Knowledge_Upload_SubmitInputs */
/** @typedef {{}} Knowledge_UploaderInputs */
/** @typedef {{}} Knowledge_Uploaded_AtInputs */
/** @typedef {{}} Knowledge_UploadingInputs */
/** @typedef {{}} Knowledge_View_DocumentInputs */
/** @typedef {{}} Knowledge_View_SourceInputs */
/** @typedef {{}} Session_Unknown_ChannelInputs */
/** @typedef {{}} App_Logo_AltInputs */
/** @typedef {{}} Onboarding_Company_Website_PlaceholderInputs */
/** @typedef {{}} Member_Management_Email_PlaceholderInputs */
/** @typedef {{}} Service_Login_RequiredInputs */
/** @typedef {{}} Service_Company_Update_Permission_DeniedInputs */
/** @typedef {{}} Service_Company_Not_FoundInputs */
/** @typedef {{}} Service_Company_Name_RequiredInputs */
/** @typedef {{}} Service_Workspace_Create_FailedInputs */
/** @typedef {{}} Service_Workspace_Create_Missing_Company_IdInputs */
/** @typedef {{}} Service_Avatar_Public_Url_MissingInputs */
/** @typedef {{}} Service_Profile_Name_ConflictInputs */
/** @typedef {{}} Service_Profile_Member_InactiveInputs */
/** @typedef {{}} Service_Discord_Request_FailedInputs */
/** @typedef {{}} Service_Slack_Request_FailedInputs */
/** @typedef {{}} Service_Telegram_Request_FailedInputs */
/** @typedef {{}} Service_Feishu_Channels_Read_FailedInputs */
/** @typedef {{}} Service_Member_Management_Request_FailedInputs */
/** @typedef {{}} Service_Member_Activity_Report_FailedInputs */
/** @typedef {{}} Service_Event_Action_Request_FailedInputs */
/** @typedef {{}} Service_Billing_Request_FailedInputs */
/** @typedef {{}} Service_Client_Chat_Request_FailedInputs */
/** @typedef {{}} Service_Workgroup_Table_MissingInputs */
/** @typedef {{}} Service_Workgroup_Fetch_FailedInputs */
/** @typedef {{}} Service_Workgroup_Save_FailedInputs */
/** @typedef {{}} Service_Workgroup_Save_IncompleteInputs */
/** @typedef {{}} Service_Workgroup_Delete_FailedInputs */
/** @typedef {{}} Service_Event_Query_Schema_Not_ExposedInputs */
/** @typedef {{ schemaName: NonNullable<unknown> }} Service_Event_Query_Schema_Permission_DeniedInputs */
/** @typedef {{}} Service_Event_Query_FailedInputs */
/** @typedef {{}} Service_Event_Detail_Request_FailedInputs */
/** @typedef {{}} Service_Event_Query_Empty_ContentInputs */
/** @typedef {{}} Common_Lucius_Ai_NameInputs */
/** @typedef {{}} Workgroup_Meta_SupergroupInputs */
/** @typedef {{}} Workgroup_Channel_Missing_From_PlatformInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_SelectedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_AvailableInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_Saved_Needs_ConnectionInputs */
/** @typedef {{}} Workgroup_Summary_UnavailableInputs */
/** @typedef {{}} Workgroup_Summary_Needs_ConnectionInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workgroup_Helper_Connected_NamedInputs */
/** @typedef {{}} Workgroup_Discord_ReadyInputs */
/** @typedef {{}} Workgroup_Discord_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Discord_Channels_Read_FailedInputs */
/** @typedef {{}} Workgroup_Discord_Status_Read_FailedInputs */
/** @typedef {{}} Workgroup_Slack_ReadyInputs */
/** @typedef {{}} Workgroup_Slack_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Slack_Channels_Read_FailedInputs */
/** @typedef {{}} Workgroup_Slack_Status_Read_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Telegram_ReadyInputs */
/** @typedef {{}} Workgroup_Telegram_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Telegram_Channels_Read_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Feishu_ReadyInputs */
/** @typedef {{}} Workgroup_Feishu_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Feishu_Channels_Read_FailedInputs */
/** @typedef {{ status: NonNullable<unknown> }} Knowledge_Session_Load_FailedInputs */
/** @typedef {{}} Billing_Plan_Name_FreeInputs */
/** @typedef {{}} Billing_Plan_Name_BasicInputs */
/** @typedef {{}} Billing_Plan_Name_ProInputs */
/** @typedef {{}} Billing_Export_Base_Plan_LabelInputs */
/** @typedef {{ planName: NonNullable<unknown> }} Billing_Export_Base_Plan_DescriptionInputs */
/** @typedef {{}} Billing_Export_Base_Plan_QuantityInputs */
/** @typedef {{}} Billing_Export_Included_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Included_Actions_DescInputs */
/** @typedef {{}} Billing_Export_Used_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Used_Actions_Desc_OverInputs */
/** @typedef {{}} Billing_Export_Used_Actions_Desc_IncludedInputs */
/** @typedef {{}} Billing_Export_Extra_Admins_LabelInputs */
/** @typedef {{}} Billing_Export_Extra_Admins_DescInputs */
/** @typedef {{}} Billing_Export_Extra_Platforms_LabelInputs */
/** @typedef {{}} Billing_Export_Extra_Platforms_DescInputs */
/** @typedef {{}} Billing_Export_Overage_Actions_LabelInputs */
/** @typedef {{ mode: NonNullable<unknown> }} Billing_Export_Overage_Actions_DescInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_StopInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_CapInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_ActionsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_AdminsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_PlatformsInputs */
/** @typedef {{}} Billing_Export_Csv_Account_IdInputs */
/** @typedef {{}} Billing_Export_Csv_Period_KeyInputs */
/** @typedef {{}} Billing_Export_Csv_Period_StartInputs */
/** @typedef {{}} Billing_Export_Csv_Period_EndInputs */
/** @typedef {{}} Billing_Export_Csv_PlanInputs */
/** @typedef {{}} Billing_Export_Csv_Overage_PolicyInputs */
/** @typedef {{}} Billing_Export_Csv_Projected_TotalInputs */
/** @typedef {{}} Billing_Export_Csv_CategoryInputs */
/** @typedef {{}} Billing_Export_Csv_DescriptionInputs */
/** @typedef {{}} Billing_Export_Csv_ChargeInputs */
/** @typedef {{}} Billing_Export_Csv_InfoInputs */
/** @typedef {{}} Billing_Export_Csv_Estimated_TotalInputs */
/** @typedef {{}} Cp_Page_TitleInputs */
/** @typedef {{}} Cp_Filter_CommunityInputs */
/** @typedef {{}} Cp_Filter_TimeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Cp_All_CommunitiesInputs */
/** @typedef {{}} Cp_Time_7dInputs */
/** @typedef {{}} Cp_Time_14dInputs */
/** @typedef {{}} Cp_Time_30dInputs */
/** @typedef {{}} Cp_Section_MetricsInputs */
/** @typedef {{}} Cp_Total_UsersInputs */
/** @typedef {{}} Cp_Total_Users_HelperInputs */
/** @typedef {{}} Cp_New_UsersInputs */
/** @typedef {{ range: NonNullable<unknown> }} Cp_New_Users_HelperInputs */
/** @typedef {{}} Cp_Active_UsersInputs */
/** @typedef {{ range: NonNullable<unknown> }} Cp_Active_Users_HelperInputs */
/** @typedef {{}} Cp_Section_TrendsInputs */
/** @typedef {{}} Cp_Chart_Total_UsersInputs */
/** @typedef {{}} Cp_Chart_New_UsersInputs */
/** @typedef {{}} Cp_Chart_Active_UsersInputs */
/** @typedef {{}} Cp_No_Chart_DataInputs */
/** @typedef {{}} Ul_Page_TitleInputs */
/** @typedef {{}} Ul_No_DataInputs */
/** @typedef {{}} Ul_Platform_AllInputs */
/** @typedef {{}} Ul_Active_AllInputs */
/** @typedef {{}} Ul_Active_7dInputs */
/** @typedef {{}} Ul_Active_30dInputs */
/** @typedef {{}} Ul_Active_90dInputs */
/** @typedef {{}} Ul_Sort_Last_ActiveInputs */
/** @typedef {{}} Ul_Sort_Total_MessagesInputs */
/** @typedef {{}} Ul_Sort_Last_SummaryInputs */
/** @typedef {{}} Ul_Sort_Last_UpdatedInputs */
/** @typedef {{}} Ul_Sort_Created_AtInputs */
/** @typedef {{}} Ul_Sort_UsernameInputs */
/** @typedef {{}} Ul_Order_DescInputs */
/** @typedef {{}} Ul_Order_AscInputs */
/** @typedef {{}} Ul_Search_PlaceholderInputs */
/** @typedef {{}} Ul_Clear_FiltersInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_UsersInputs */
/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown> }} Ul_Showing_RangeInputs */
/** @typedef {{}} Ul_UpdatingInputs */
/** @typedef {{}} Ul_Pick_Company_FirstInputs */
/** @typedef {{}} Ul_Load_ErrorInputs */
/** @typedef {{}} Ul_Col_UserInputs */
/** @typedef {{}} Ul_Col_PlatformInputs */
/** @typedef {{}} Ul_Col_Total_MessagesInputs */
/** @typedef {{}} Ul_Col_First_InteractionInputs */
/** @typedef {{}} Ul_Col_Last_ActiveInputs */
/** @typedef {{}} Ul_Col_ProfileInputs */
/** @typedef {{}} Ul_Col_TagsInputs */
/** @typedef {{}} Ul_All_TagsInputs */
/** @typedef {{}} Ul_No_TagsInputs */
/** @typedef {{}} Ul_Min_MessagesInputs */
/** @typedef {{}} Ul_Sort_FieldInputs */
/** @typedef {{}} Ul_Sort_OrderInputs */
/** @typedef {{}} Ul_No_ProfileInputs */
/** @typedef {{}} Ul_Empty_ResultsInputs */
/** @typedef {{}} Ul_Detail_TitleInputs */
/** @typedef {{}} Ul_Close_DetailInputs */
/** @typedef {{}} Ul_Detail_First_InteractionInputs */
/** @typedef {{}} Ul_Detail_First_Interaction_HelperInputs */
/** @typedef {{}} Ul_Detail_Last_ActiveInputs */
/** @typedef {{}} Ul_Detail_Last_Active_HelperInputs */
/** @typedef {{}} Ul_Detail_ProfileInputs */
/** @typedef {{}} Ul_Detail_Profile_ExpandInputs */
/** @typedef {{}} Ul_Detail_Profile_CollapseInputs */
/** @typedef {{}} Ul_Detail_TagsInputs */
/** @typedef {{}} Ul_Detail_No_ReasonInputs */
/** @typedef {{}} Ul_Trend_Messages_TitleInputs */
/** @typedef {{}} Ul_Trend_Messages_DescInputs */
/** @typedef {{}} Ul_Trend_Active_TitleInputs */
/** @typedef {{}} Ul_Trend_Active_DescInputs */
/** @typedef {{}} Ul_Chat_RecordsInputs */
/** @typedef {{}} Ul_Loading_MessagesInputs */
/** @typedef {{}} Ul_Load_Messages_ErrorInputs */
/** @typedef {{}} Ul_No_MessagesInputs */
/** @typedef {{}} Ul_Empty_MessageInputs */
/** @typedef {{ channelId: NonNullable<unknown> }} Ul_ChannelInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_Messages_CountInputs */
/** @typedef {{}} Ul_Loading_DetailInputs */
/** @typedef {{}} Ul_Loading_Detail_DescInputs */
/** @typedef {{}} Ul_Detail_Load_ErrorInputs */
/** @typedef {{}} Ul_Retry_LaterInputs */
/** @typedef {{}} Ul_Tag_Manage_ButtonInputs */
/** @typedef {{}} Ul_Tag_Manage_TitleInputs */
/** @typedef {{}} Ul_Tag_Manage_DescInputs */
/** @typedef {{}} Ul_Tag_ExistingInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Tag_CountInputs */
/** @typedef {{}} Ul_Tag_LoadingInputs */
/** @typedef {{}} Ul_Tag_Load_ErrorInputs */
/** @typedef {{}} Ul_Tag_EmptyInputs */
/** @typedef {{}} Ul_Tag_Status_ActiveInputs */
/** @typedef {{}} Ul_Tag_Status_InactiveInputs */
/** @typedef {{}} Ul_Tag_Toggle_LabelInputs */
/** @typedef {{}} Ul_Tag_No_DescriptionInputs */
/** @typedef {{}} Ul_Tag_Create_TitleInputs */
/** @typedef {{}} Ul_Tag_Create_DescInputs */
/** @typedef {{}} Ul_Tag_Form_NameInputs */
/** @typedef {{}} Ul_Tag_Form_Name_PlaceholderInputs */
/** @typedef {{}} Ul_Tag_Form_Name_RequiredInputs */
/** @typedef {{}} Ul_Tag_Form_DescriptionInputs */
/** @typedef {{}} Ul_Tag_Form_Description_PlaceholderInputs */
/** @typedef {{}} Ul_Tag_Create_ButtonInputs */
/** @typedef {{}} Ul_Tag_Create_LoadingInputs */
/** @typedef {{}} Ul_Tag_Create_SuccessInputs */
/** @typedef {{}} Ul_Tag_Create_ErrorInputs */
/** @typedef {{}} Ul_Tag_Update_ErrorInputs */
/** @typedef {{}} Ul_Tag_Enable_SuccessInputs */
/** @typedef {{}} Ul_Tag_Disable_SuccessInputs */
/** @typedef {{}} Ul_Tag_Init_ButtonInputs */
/** @typedef {{}} Ul_Tag_Init_LoadingInputs */
/** @typedef {{}} Ul_Tag_Init_SuccessInputs */
/** @typedef {{}} Ul_Tag_Init_ErrorInputs */


export const app_description = /** @type {(inputs: App_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`像真人同事一样，能从你的社区中学习并与你的团队协作的 AI 队友。`)
};

export const app_title = /** @type {(inputs: App_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

export const auth_back = /** @type {(inputs: Auth_BackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回`)
};

export const auth_callback_failed = /** @type {(inputs: Auth_Callback_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`登录回调失败：${i?.message}`)
};

export const auth_callback_invalid_link = /** @type {(inputs: Auth_Callback_Invalid_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮件链接无效或已过期`)
};

export const auth_callback_missing_session = /** @type {(inputs: Auth_Callback_Missing_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未获取到会话，请重新发送魔法链接。`)
};

export const auth_callback_unknown_error = /** @type {(inputs: Auth_Callback_Unknown_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知回调错误`)
};

export const auth_email_label = /** @type {(inputs: Auth_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱地址`)
};

export const auth_email_login = /** @type {(inputs: Auth_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱登录`)
};

export const auth_email_login_failed = /** @type {(inputs: Auth_Email_Login_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`邮件登录失败：${i?.message}`)
};

export const auth_email_placeholder = /** @type {(inputs: Auth_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入您的邮箱地址`)
};

export const auth_email_required = /** @type {(inputs: Auth_Email_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入邮箱地址。`)
};

export const auth_get_magic_link = /** @type {(inputs: Auth_Get_Magic_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`获取登录链接`)
};

export const auth_login_title = /** @type {(inputs: Auth_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`注册 / 登录`)
};

export const auth_login_with_github = /** @type {(inputs: Auth_Login_With_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过 GitHub 账号登录`)
};

export const auth_login_with_google = /** @type {(inputs: Auth_Login_With_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过 Google 账号登录`)
};

export const auth_magic_link_sent_hint = /** @type {(inputs: Auth_Magic_Link_Sent_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请点击邮件中的链接登录。`)
};

export const auth_magic_link_sent_to = /** @type {(inputs: Auth_Magic_Link_Sent_ToInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已发送邮件到：${i?.email}`)
};

export const auth_or = /** @type {(inputs: Auth_OrInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`或`)
};

export const auth_provider_github = /** @type {(inputs: Auth_Provider_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub`)
};

export const auth_provider_google = /** @type {(inputs: Auth_Provider_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Google`)
};

export const auth_provider_login_failed = /** @type {(inputs: Auth_Provider_Login_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.provider} 登录失败：${i?.message}`)
};

export const auth_resend = /** @type {(inputs: Auth_ResendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新发送`)
};

export const auth_resend_countdown = /** @type {(inputs: Auth_Resend_CountdownInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`重新发送（${i?.seconds}s）`)
};

export const auth_resend_email_failed = /** @type {(inputs: Auth_Resend_Email_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`重发邮件失败：${i?.message}`)
};

export const auth_unknown_error_retry = /** @type {(inputs: Auth_Unknown_Error_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知错误，请稍后重试。`)
};

export const assist_tasks_adopted_knowledge_load_error = /** @type {(inputs: Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`采用知识加载失败：${i?.message}`)
};

export const assist_tasks_adopted_knowledge_title = /** @type {(inputs: Assist_Tasks_Adopted_Knowledge_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`采用的知识 (${i?.count})`)
};

export const assist_tasks_add_supplemental = /** @type {(inputs: Assist_Tasks_Add_SupplementalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`补充知识库`)
};

export const assist_tasks_assignee_label = /** @type {(inputs: Assist_Tasks_Assignee_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assignee`)
};

export const assist_tasks_close_event_detail = /** @type {(inputs: Assist_Tasks_Close_Event_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭任务详情`)
};

export const assist_tasks_close_session_detail = /** @type {(inputs: Assist_Tasks_Close_Session_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭详情`)
};

export const assist_tasks_confirm_reply = /** @type {(inputs: Assist_Tasks_Confirm_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认并发送`)
};

export const assist_tasks_confirm_reply_success = /** @type {(inputs: Assist_Tasks_Confirm_Reply_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建议回复已确认。`)
};

export const assist_tasks_confirm_reply_error = /** @type {(inputs: Assist_Tasks_Confirm_Reply_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认回答失败，请稍后重试。`)
};

export const assist_tasks_confirming_reply = /** @type {(inputs: Assist_Tasks_Confirming_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认中...`)
};

export const assist_tasks_reject_reply = /** @type {(inputs: Assist_Tasks_Reject_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消采用`)
};

export const assist_tasks_reject_reply_success = /** @type {(inputs: Assist_Tasks_Reject_Reply_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建议回复已取消采用。`)
};

export const assist_tasks_reject_reply_error = /** @type {(inputs: Assist_Tasks_Reject_Reply_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消采用失败，请稍后重试。`)
};

export const assist_tasks_rejecting_reply = /** @type {(inputs: Assist_Tasks_Rejecting_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消中...`)
};

export const assist_tasks_show_suggested_reply = /** @type {(inputs: Assist_Tasks_Show_Suggested_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看建议回复`)
};

export const assist_tasks_hide_suggested_reply = /** @type {(inputs: Assist_Tasks_Hide_Suggested_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收起建议回复`)
};

export const assist_tasks_detail_load_failed_title = /** @type {(inputs: Assist_Tasks_Detail_Load_Failed_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务详情加载失败`)
};

export const assist_tasks_detail_not_found_desc = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前公司下不存在这个事件，或者你没有查看权限。`)
};

export const assist_tasks_detail_not_found_title = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到该事件`)
};

export const assist_tasks_empty_desc = /** @type {(inputs: Assist_Tasks_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可以尝试清空关键词或切换筛选条件。`)
};

export const assist_tasks_empty_title = /** @type {(inputs: Assist_Tasks_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前筛选条件下暂无协助任务`)
};

export const assist_tasks_event_detail_title = /** @type {(inputs: Assist_Tasks_Event_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务详情`)
};

export const assist_tasks_session_detail_title = /** @type {(inputs: Assist_Tasks_Session_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务详情`)
};

export const assist_tasks_event_load_failed = /** @type {(inputs: Assist_Tasks_Event_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件加载失败`)
};

export const assist_tasks_filter_all_types = /** @type {(inputs: Assist_Tasks_Filter_All_TypesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部类型`)
};

export const assist_tasks_filter_status_all = /** @type {(inputs: Assist_Tasks_Filter_Status_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部状态`)
};

export const assist_tasks_filter_status_ignored = /** @type {(inputs: Assist_Tasks_Filter_Status_IgnoredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已忽略`)
};

export const assist_tasks_filter_status_label = /** @type {(inputs: Assist_Tasks_Filter_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`状态筛选`)
};

export const assist_tasks_filter_status_pending = /** @type {(inputs: Assist_Tasks_Filter_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待处理`)
};

export const assist_tasks_filter_status_processing = /** @type {(inputs: Assist_Tasks_Filter_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`处理中`)
};

export const assist_tasks_filter_status_resolved = /** @type {(inputs: Assist_Tasks_Filter_Status_ResolvedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解决`)
};

export const assist_tasks_filter_status_taken_over = /** @type {(inputs: Assist_Tasks_Filter_Status_Taken_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已接手`)
};

export const assist_tasks_filter_type_label = /** @type {(inputs: Assist_Tasks_Filter_Type_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型筛选`)
};

export const assist_tasks_ignore = /** @type {(inputs: Assist_Tasks_IgnoreInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略`)
};

export const assist_tasks_ignore_confirm_action = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认忽略`)
};

export const assist_tasks_ignore_confirm_desc = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略后该事件会被标记为“已忽略”，不会再出现在待处理列表中。`)
};

export const assist_tasks_ignore_confirm_title = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认忽略该事件？`)
};

export const assist_tasks_ignore_error = /** @type {(inputs: Assist_Tasks_Ignore_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略事件失败，请稍后重试。`)
};

export const assist_tasks_ignore_success = /** @type {(inputs: Assist_Tasks_Ignore_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件已忽略。`)
};

export const assist_tasks_ignoring = /** @type {(inputs: Assist_Tasks_IgnoringInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略中...`)
};

export const assist_tasks_list_title = /** @type {(inputs: Assist_Tasks_List_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件列表`)
};

export const assist_tasks_messages_load_error = /** @type {(inputs: Assist_Tasks_Messages_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`消息加载失败：${i?.message}`)
};

export const assist_tasks_message_input_placeholder = /** @type {(inputs: Assist_Tasks_Message_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius要如何回复用户？`)
};

export const assist_tasks_suggested_reply_input_placeholder = /** @type {(inputs: Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑建议回复...`)
};

export const assist_tasks_message_send = /** @type {(inputs: Assist_Tasks_Message_SendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送至Lucius`)
};

export const assist_tasks_message_send_error = /** @type {(inputs: Assist_Tasks_Message_Send_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送消息失败，请稍后重试。`)
};

export const assist_tasks_message_send_pending = /** @type {(inputs: Assist_Tasks_Message_Send_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送中...`)
};

export const assist_tasks_message_send_success = /** @type {(inputs: Assist_Tasks_Message_Send_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息已发送。`)
};

export const assist_tasks_no_messages = /** @type {(inputs: Assist_Tasks_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前事件暂无可展示的消息内容。`)
};

export const assist_tasks_no_owner = /** @type {(inputs: Assist_Tasks_No_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无负责人`)
};

export const assist_tasks_no_owner_short = /** @type {(inputs: Assist_Tasks_No_Owner_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无`)
};

export const assist_tasks_no_summary = /** @type {(inputs: Assist_Tasks_No_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无事件摘要`)
};

export const assist_tasks_overdue_days = /** @type {(inputs: Assist_Tasks_Overdue_DaysInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超时 ${i?.count} 天`)
};

export const assist_tasks_overdue_default = /** @type {(inputs: Assist_Tasks_Overdue_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已超时`)
};

export const assist_tasks_overdue_hours = /** @type {(inputs: Assist_Tasks_Overdue_HoursInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超时 ${i?.count} 小时`)
};

export const assist_tasks_participant_avatar_alt = /** @type {(inputs: Assist_Tasks_Participant_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`参与者头像`)
};

export const assist_tasks_review_confirmed = /** @type {(inputs: Assist_Tasks_Review_ConfirmedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人工确认`)
};

export const assist_tasks_review_pending = /** @type {(inputs: Assist_Tasks_Review_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待人工确认`)
};

export const assist_tasks_review_taken_over = /** @type {(inputs: Assist_Tasks_Review_Taken_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已接手`)
};

export const assist_tasks_resolve = /** @type {(inputs: Assist_Tasks_ResolveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解决`)
};

export const assist_tasks_resolve_error = /** @type {(inputs: Assist_Tasks_Resolve_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结束事件失败，请稍后重试。`)
};

export const assist_tasks_resolve_pending = /** @type {(inputs: Assist_Tasks_Resolve_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结束中...`)
};

export const assist_tasks_resolve_success = /** @type {(inputs: Assist_Tasks_Resolve_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件已结束。`)
};

export const assist_tasks_save_pending = /** @type {(inputs: Assist_Tasks_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

export const assist_tasks_save_supplemental_error = /** @type {(inputs: Assist_Tasks_Save_Supplemental_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存补充知识失败，请稍后重试。`)
};

export const assist_tasks_save_supplemental_success = /** @type {(inputs: Assist_Tasks_Save_Supplemental_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`补充知识已保存。`)
};

export const assist_tasks_search_placeholder = /** @type {(inputs: Assist_Tasks_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索关键词`)
};

export const assist_tasks_supplemental_placeholder = /** @type {(inputs: Assist_Tasks_Supplemental_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入补充知识...`)
};

export const assist_tasks_takeover = /** @type {(inputs: Assist_Tasks_TakeoverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接手任务`)
};

export const assist_tasks_takeover_error = /** @type {(inputs: Assist_Tasks_Takeover_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接手事件失败，请稍后重试。`)
};

export const assist_tasks_takeover_pending = /** @type {(inputs: Assist_Tasks_Takeover_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接手中...`)
};

export const assist_tasks_takeover_success = /** @type {(inputs: Assist_Tasks_Takeover_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件已接手。`)
};

export const assist_tasks_timed_out_count = /** @type {(inputs: Assist_Tasks_Timed_Out_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超时 (${i?.count})`)
};

export const assist_tasks_type_advertisement = /** @type {(inputs: Assist_Tasks_Type_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`广告`)
};

export const assist_tasks_type_assign_request = /** @type {(inputs: Assist_Tasks_Type_Assign_RequestInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指派请求`)
};

export const assist_tasks_type_bug_report = /** @type {(inputs: Assist_Tasks_Type_Bug_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bug 报告`)
};

export const assist_tasks_type_business_cooperation = /** @type {(inputs: Assist_Tasks_Type_Business_CooperationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`商务合作`)
};

export const assist_tasks_type_exception_issue = /** @type {(inputs: Assist_Tasks_Type_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常问题`)
};

export const assist_tasks_type_feedback = /** @type {(inputs: Assist_Tasks_Type_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`反馈`)
};

export const assist_tasks_type_knowledge_request = /** @type {(inputs: Assist_Tasks_Type_Knowledge_RequestInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识咨询`)
};

export const assist_tasks_type_message_deletion = /** @type {(inputs: Assist_Tasks_Type_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息删除`)
};

export const assist_tasks_type_order_issue = /** @type {(inputs: Assist_Tasks_Type_Order_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`订单问题`)
};

export const assist_tasks_type_payment_issue = /** @type {(inputs: Assist_Tasks_Type_Payment_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`金额问题`)
};

export const assist_tasks_type_product_feedback = /** @type {(inputs: Assist_Tasks_Type_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`产品反馈`)
};

export const assist_tasks_type_unknown = /** @type {(inputs: Assist_Tasks_Type_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他问题`)
};

export const assist_tasks_type_unrecognized_information = /** @type {(inputs: Assist_Tasks_Type_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法识别信息`)
};

export const assist_tasks_type_usage_issue = /** @type {(inputs: Assist_Tasks_Type_Usage_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用问题`)
};

export const assist_tasks_unknown_channel = /** @type {(inputs: Assist_Tasks_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知频道`)
};

export const assist_tasks_unnamed_task = /** @type {(inputs: Assist_Tasks_Unnamed_TaskInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名协助任务`)
};

export const assist_tasks_view_adopted_knowledge = /** @type {(inputs: Assist_Tasks_View_Adopted_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看采用的知识`)
};

export const assist_tasks_view_adopted_knowledge_count = /** @type {(inputs: Assist_Tasks_View_Adopted_Knowledge_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`查看采用的知识，共 ${i?.count} 条`)
};

export const assist_tasks_view_item = /** @type {(inputs: Assist_Tasks_View_ItemInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`查看协助任务：${i?.title}`)
};

export const client_chat_attachment_alt = /** @type {(inputs: Client_Chat_Attachment_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`聊天附件`)
};

export const client_chat_draft_session = /** @type {(inputs: Client_Chat_Draft_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名对话`)
};

export const client_chat_draft_badge = /** @type {(inputs: Client_Chat_Draft_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`草稿`)
};

export const client_chat_loading_session_title = /** @type {(inputs: Client_Chat_Loading_Session_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载对话标题`)
};

export const client_chat_empty_brand_title = /** @type {(inputs: Client_Chat_Empty_Brand_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius Client Agent`)
};

export const client_chat_empty_sessions = /** @type {(inputs: Client_Chat_Empty_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无对话，点击“新对话”开始。`)
};

export const client_chat_empty_input_hint = /** @type {(inputs: Client_Chat_Empty_Input_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这一步点哪里？`)
};

export const client_chat_image_count_limit = /** @type {(inputs: Client_Chat_Image_Count_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`最多上传 ${i?.count} 张图片。`)
};

export const client_chat_image_only = /** @type {(inputs: Client_Chat_Image_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只支持上传图片文件。`)
};

export const client_chat_image_size_limit = /** @type {(inputs: Client_Chat_Image_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`图片大小不能超过 ${i?.size}。`)
};

export const client_chat_history_sessions = /** @type {(inputs: Client_Chat_History_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`历史对话`)
};

export const client_chat_input_placeholder = /** @type {(inputs: Client_Chat_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入消息...`)
};

export const client_chat_load_sessions_failed = /** @type {(inputs: Client_Chat_Load_Sessions_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话列表加载失败`)
};

export const client_chat_copy_message = /** @type {(inputs: Client_Chat_Copy_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制消息`)
};

export const client_chat_copy_success = /** @type {(inputs: Client_Chat_Copy_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制消息。`)
};

export const client_chat_copy_failed = /** @type {(inputs: Client_Chat_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制消息失败，请稍后重试。`)
};

export const client_chat_like_message = /** @type {(inputs: Client_Chat_Like_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点赞回复`)
};

export const client_chat_dislike_message = /** @type {(inputs: Client_Chat_Dislike_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点踩回复`)
};

export const client_chat_regenerate_message = /** @type {(inputs: Client_Chat_Regenerate_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新生成回复`)
};

export const client_chat_lucius_name = /** @type {(inputs: Client_Chat_Lucius_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

export const client_chat_me = /** @type {(inputs: Client_Chat_MeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`我`)
};

export const client_chat_more_actions = /** @type {(inputs: Client_Chat_More_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多操作`)
};

export const client_chat_new_session = /** @type {(inputs: Client_Chat_New_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新对话`)
};

export const client_chat_next_page = /** @type {(inputs: Client_Chat_Next_PageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一页`)
};

export const client_chat_no_messages = /** @type {(inputs: Client_Chat_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无消息`)
};

export const client_chat_page_status = /** @type {(inputs: Client_Chat_Page_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.page}/${i?.totalPages} · 共 ${i?.total}`)
};

export const client_chat_pin_session = /** @type {(inputs: Client_Chat_Pin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`星标对话`)
};

export const client_chat_preview_empty = /** @type {(inputs: Client_Chat_Preview_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`空消息`)
};

export const client_chat_preview_fallback = /** @type {(inputs: Client_Chat_Preview_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话`)
};

export const client_chat_preview_image = /** @type {(inputs: Client_Chat_Preview_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`[图片]`)
};

export const client_chat_prev_page = /** @type {(inputs: Client_Chat_Prev_PageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一页`)
};

export const client_chat_prompt_capabilities = /** @type {(inputs: Client_Chat_Prompt_CapabilitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius可以为我做什么？`)
};

export const client_chat_prompt_invite_agent = /** @type {(inputs: Client_Chat_Prompt_Invite_AgentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`如何将Lucius Agent邀请至用户社群`)
};

export const client_chat_prompt_role_difference = /** @type {(inputs: Client_Chat_Prompt_Role_DifferenceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不同角色的Lucius Agent有哪些区别`)
};

export const client_chat_prompt_update_knowledge = /** @type {(inputs: Client_Chat_Prompt_Update_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`如何修改知识库中的知识`)
};
export { client_chat_reply_ready_description } from "./en.js"
export { client_chat_reply_ready_title } from "./en.js"
export { client_chat_replying } from "./en.js"

export const client_chat_remove_session = /** @type {(inputs: Client_Chat_Remove_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除对话`)
};

export const client_chat_remove_selected_image = /** @type {(inputs: Client_Chat_Remove_Selected_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移除已选图片`)
};

export const client_chat_rename_session = /** @type {(inputs: Client_Chat_Rename_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修改标题`)
};

export const client_chat_rename_session_prompt = /** @type {(inputs: Client_Chat_Rename_Session_PromptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入新的对话标题`)
};

export const client_chat_search = /** @type {(inputs: Client_Chat_SearchInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索`)
};

export const client_chat_search_empty = /** @type {(inputs: Client_Chat_Search_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`没有匹配的对话`)
};

export const client_chat_search_placeholder = /** @type {(inputs: Client_Chat_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入关键词`)
};

export const client_chat_search_title = /** @type {(inputs: Client_Chat_Search_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索对话`)
};

export const client_chat_select_company = /** @type {(inputs: Client_Chat_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司`)
};

export const client_chat_send_message = /** @type {(inputs: Client_Chat_Send_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送消息`)
};

export const client_chat_session_today = /** @type {(inputs: Client_Chat_Session_TodayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`今天`)
};

export const client_chat_session_week_ago = /** @type {(inputs: Client_Chat_Session_Week_AgoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一周前`)
};

export const client_chat_session_yesterday = /** @type {(inputs: Client_Chat_Session_YesterdayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`昨天`)
};

export const client_chat_sending = /** @type {(inputs: Client_Chat_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送中`)
};

export const client_chat_starred_sessions = /** @type {(inputs: Client_Chat_Starred_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`星标对话`)
};

export const client_chat_sessions = /** @type {(inputs: Client_Chat_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话`)
};

export const client_chat_title = /** @type {(inputs: Client_Chat_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`对话`)
};

export const client_chat_unpin_session = /** @type {(inputs: Client_Chat_Unpin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消星标`)
};

export const client_chat_upload_image = /** @type {(inputs: Client_Chat_Upload_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传图片`)
};

export const client_chat_user_fallback = /** @type {(inputs: Client_Chat_User_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户`)
};
export { client_chat_view_reply } from "./en.js"

export const common_back = /** @type {(inputs: Common_BackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回`)
};

export const common_cancel = /** @type {(inputs: Common_CancelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消`)
};

export const common_clear = /** @type {(inputs: Common_ClearInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清空`)
};

export const common_close = /** @type {(inputs: Common_CloseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭`)
};

export const common_coming_soon = /** @type {(inputs: Common_Coming_SoonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`即将上线`)
};

export const common_error = /** @type {(inputs: Common_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`错误`)
};

export const common_hours_ago = /** @type {(inputs: Common_Hours_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 小时前`)
};

export const common_just_now = /** @type {(inputs: Common_Just_NowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刚刚`)
};

export const common_minutes_ago = /** @type {(inputs: Common_Minutes_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 分钟前`)
};

export const common_next = /** @type {(inputs: Common_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

export const common_next_step = /** @type {(inputs: Common_Next_StepInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

export const common_retry = /** @type {(inputs: Common_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试`)
};

export const common_save = /** @type {(inputs: Common_SaveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存`)
};

export const common_saving = /** @type {(inputs: Common_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

export const common_unknown = /** @type {(inputs: Common_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知`)
};

export const pwa_install_app = /** @type {(inputs: Pwa_Install_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装应用`)
};

export const language_label = /** @type {(inputs: Language_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语言`)
};

export const language_zh = /** @type {(inputs: Language_ZhInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`中文`)
};

export const language_en = /** @type {(inputs: Language_EnInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`English`)
};

export const header_action_files = /** @type {(inputs: Header_Action_FilesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

export const header_action_menu = /** @type {(inputs: Header_Action_MenuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`菜单`)
};

export const header_action_notifications = /** @type {(inputs: Header_Action_NotificationsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通知`)
};

export const header_brand = /** @type {(inputs: Header_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`品牌`)
};

export const sidebar_group_servers = /** @type {(inputs: Sidebar_Group_ServersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`服务器`)
};

export const sidebar_group_sessions = /** @type {(inputs: Sidebar_Group_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话`)
};

export const sidebar_group_org = /** @type {(inputs: Sidebar_Group_OrgInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组织`)
};

export const sidebar_group_org_short = /** @type {(inputs: Sidebar_Group_Org_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组织`)
};

export const sidebar_item_conversation = /** @type {(inputs: Sidebar_Item_ConversationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`对话`)
};

export const sidebar_item_agent_config = /** @type {(inputs: Sidebar_Item_Agent_ConfigInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent配置`)
};

export const sidebar_item_user_portrait = /** @type {(inputs: Sidebar_Item_User_PortraitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户画像`)
};

export const sidebar_item_community_profile = /** @type {(inputs: Sidebar_Item_Community_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区画像`)
};

export const sidebar_item_user_list = /** @type {(inputs: Sidebar_Item_User_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户列表`)
};

export const sidebar_item_assist_tasks = /** @type {(inputs: Sidebar_Item_Assist_TasksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`协助任务`)
};

export const sidebar_item_all_sessions = /** @type {(inputs: Sidebar_Item_All_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有会话`)
};

export const sidebar_item_ad_review = /** @type {(inputs: Sidebar_Item_Ad_ReviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`广告审查`)
};

export const sidebar_item_client_chat = /** @type {(inputs: Sidebar_Item_Client_ChatInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`聊天`)
};

export const sidebar_item_knowledge_base = /** @type {(inputs: Sidebar_Item_Knowledge_BaseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识库`)
};

export const sidebar_item_daily_report = /** @type {(inputs: Sidebar_Item_Daily_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`日报`)
};

export const sidebar_settings = /** @type {(inputs: Sidebar_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置`)
};

export const sidebar_sign_out = /** @type {(inputs: Sidebar_Sign_OutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`退出登录`)
};

export const sidebar_not_logged_in = /** @type {(inputs: Sidebar_Not_Logged_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未登录`)
};

export const sidebar_company_not_found = /** @type {(inputs: Sidebar_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到公司`)
};

export const sidebar_select_company = /** @type {(inputs: Sidebar_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择公司`)
};

export const sidebar_servers_count = /** @type {(inputs: Sidebar_Servers_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 组织`)
};

export const kb_title = /** @type {(inputs: Kb_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识库`)
};

export const kb_tab_all = /** @type {(inputs: Kb_Tab_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有知识`)
};

export const kb_tab_docs = /** @type {(inputs: Kb_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

export const kb_search_placeholder = /** @type {(inputs: Kb_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索关键词`)
};

export const kb_upload = /** @type {(inputs: Kb_UploadInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传知识`)
};

export const kb_total_count = /** @type {(inputs: Kb_Total_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`共${i?.count}条`)
};

export const kb_filter_source = /** @type {(inputs: Kb_Filter_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来源`)
};

export const kb_empty = /** @type {(inputs: Kb_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无知识数据`)
};

export const kb_pick_company_first = /** @type {(inputs: Kb_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先在左上角选择公司后再查看知识库。`)
};

export const kb_load_error = /** @type {(inputs: Kb_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`知识库加载失败：${i?.message}`)
};

export const kb_menu_edit = /** @type {(inputs: Kb_Menu_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修改`)
};

export const kb_menu_delete = /** @type {(inputs: Kb_Menu_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除`)
};

export const kb_source_official_doc = /** @type {(inputs: Kb_Source_Official_DocInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`官方文档`)
};

export const kb_source_session_record = /** @type {(inputs: Kb_Source_Session_RecordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话记录`)
};

export const kb_source_manual = /** @type {(inputs: Kb_Source_ManualInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动添加`)
};

export const kb_unknown_title = /** @type {(inputs: Kb_Unknown_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名知识`)
};

export const header_collapse_sidebar = /** @type {(inputs: Header_Collapse_SidebarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`折叠侧边栏`)
};

export const header_email_login = /** @type {(inputs: Header_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱登录`)
};

export const header_loading_auth = /** @type {(inputs: Header_Loading_AuthInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载登录状态`)
};

export const header_rows = /** @type {(inputs: Header_RowsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`第${i?.start}-${i?.end}行，共${i?.total}行`)
};

export const header_prev = /** @type {(inputs: Header_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一页`)
};

export const header_next = /** @type {(inputs: Header_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一页`)
};

export const header_open_action_menu = /** @type {(inputs: Header_Open_Action_MenuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开操作菜单`)
};

export const header_settings = /** @type {(inputs: Header_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置`)
};

export const header_user_avatar_alt = /** @type {(inputs: Header_User_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户头像`)
};

export const kb_doc_title = /** @type {(inputs: Kb_Doc_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标题`)
};

export const kb_doc_generated_count = /** @type {(inputs: Kb_Doc_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成知识数量`)
};

export const kb_doc_uploader = /** @type {(inputs: Kb_Doc_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传人`)
};

export const kb_doc_uploaded_at = /** @type {(inputs: Kb_Doc_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传时间`)
};

export const kb_docs_empty = /** @type {(inputs: Kb_Docs_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无文档数据`)
};

export const kb_upload_doc_tab = /** @type {(inputs: Kb_Upload_Doc_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传文档`)
};

export const kb_upload_manual_tab = /** @type {(inputs: Kb_Upload_Manual_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动添加`)
};

export const kb_upload_manual_placeholder = /** @type {(inputs: Kb_Upload_Manual_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入知识内容`)
};

export const kb_upload_doc_todo = /** @type {(inputs: Kb_Upload_Doc_TodoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档上传功能下一步接入 upload 接口，当前先支持手动添加。`)
};

export const kb_upload_cancel = /** @type {(inputs: Kb_Upload_CancelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消`)
};

export const kb_upload_submit = /** @type {(inputs: Kb_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传`)
};

export const kb_uploading = /** @type {(inputs: Kb_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传中...`)
};

export const kb_upload_manual_required = /** @type {(inputs: Kb_Upload_Manual_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先输入知识内容后再上传。`)
};

export const kb_upload_doc_click = /** @type {(inputs: Kb_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击上传`)
};

export const kb_upload_doc_drag_hint = /** @type {(inputs: Kb_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`或将文件拖放至此处`)
};

export const kb_upload_doc_format_hint = /** @type {(inputs: Kb_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支持上传文件格式为：pdf, doc, docx`)
};

export const kb_upload_doc_required = /** @type {(inputs: Kb_Upload_Doc_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择需要上传的文档。`)
};

export const kb_upload_doc_missing_document_id = /** @type {(inputs: Kb_Upload_Doc_Missing_Document_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传成功但未返回 document_id，请稍后重试。`)
};

export const kb_upload_doc_timeout = /** @type {(inputs: Kb_Upload_Doc_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档处理超时，请稍后在文档列表查看状态。`)
};

export const kb_upload_doc_failed = /** @type {(inputs: Kb_Upload_Doc_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`文档处理失败（状态：${i?.status}）。`)
};

export const kb_upload_doc_selected = /** @type {(inputs: Kb_Upload_Doc_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已选择：${i?.name}`)
};

export const kb_edit_title = /** @type {(inputs: Kb_Edit_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑知识`)
};

export const kb_edit_close = /** @type {(inputs: Kb_Edit_CloseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭编辑弹窗`)
};

export const kb_edit_label_title = /** @type {(inputs: Kb_Edit_Label_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标题`)
};

export const kb_edit_label_content = /** @type {(inputs: Kb_Edit_Label_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内容`)
};

export const kb_edit_save = /** @type {(inputs: Kb_Edit_SaveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存`)
};

export const kb_edit_saving = /** @type {(inputs: Kb_Edit_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

export const kb_edit_missing_target = /** @type {(inputs: Kb_Edit_Missing_TargetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到可编辑的知识记录，请重试。`)
};

export const kb_edit_title_required = /** @type {(inputs: Kb_Edit_Title_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入标题后再保存。`)
};

export const kb_edit_content_required = /** @type {(inputs: Kb_Edit_Content_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入内容后再保存。`)
};

export const kb_upload_progress_status = /** @type {(inputs: Kb_Upload_Progress_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`状态：${i?.status}`)
};

export const kb_result_generated_count = /** @type {(inputs: Kb_Result_Generated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`生成知识 (${i?.count})`)
};

export const kb_result_updated_count = /** @type {(inputs: Kb_Result_Updated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新知识 (${i?.count})`)
};

export const kb_result_chunk_prefix = /** @type {(inputs: Kb_Result_Chunk_PrefixInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Chunk #${i?.index}`)
};

export const kb_result_empty = /** @type {(inputs: Kb_Result_EmptyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`暂无可展示结果（文档 ID：${i?.document_id}）`)
};

export const kb_result_regenerate = /** @type {(inputs: Kb_Result_RegenerateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新生成`)
};

export const kb_result_regenerating = /** @type {(inputs: Kb_Result_RegeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新生成中...`)
};

export const kb_result_confirm = /** @type {(inputs: Kb_Result_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认`)
};

export const knowledge_doc_processing_timeout = /** @type {(inputs: Knowledge_Doc_Processing_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档处理超时`)
};

export const knowledge_document_status_load_failed = /** @type {(inputs: Knowledge_Document_Status_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载文档状态失败`)
};

export const knowledge_failed_chunk_attempts = /** @type {(inputs: Knowledge_Failed_Chunk_AttemptsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已尝试 ${i?.count} 次`)
};

export const knowledge_failed_chunk_heading_fallback = /** @type {(inputs: Knowledge_Failed_Chunk_Heading_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名分片`)
};

export const knowledge_failed_chunks_empty = /** @type {(inputs: Knowledge_Failed_Chunks_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前文档没有失败分片`)
};

export const knowledge_failed_chunks_select_all = /** @type {(inputs: Knowledge_Failed_Chunks_Select_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全选失败分片`)
};

export const knowledge_failed_chunks_selected_count = /** @type {(inputs: Knowledge_Failed_Chunks_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已选 ${i?.count}`)
};

export const knowledge_failed_chunks_title = /** @type {(inputs: Knowledge_Failed_Chunks_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失败分片`)
};

export const knowledge_retry_all_failed_chunks = /** @type {(inputs: Knowledge_Retry_All_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试全部失败分片`)
};

export const knowledge_retry_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Failed_Chunks_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已开始重试当前文档的失败分片`)
};

export const knowledge_retry_selected_failed_chunks = /** @type {(inputs: Knowledge_Retry_Selected_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试已选分片`)
};

export const knowledge_retry_selected_failed_chunks_required = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先勾选要重试的失败分片`)
};

export const knowledge_retry_selected_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_StartedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已开始重试 ${i?.count} 个失败分片`)
};

export const knowledge_retrying_failed_chunks = /** @type {(inputs: Knowledge_Retrying_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试中...`)
};

export const knowledge_upload_progress_prefix = /** @type {(inputs: Knowledge_Upload_Progress_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`状态：`)
};

export const knowledge_upload_status_completed = /** @type {(inputs: Knowledge_Upload_Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已完成`)
};

export const knowledge_upload_status_failed = /** @type {(inputs: Knowledge_Upload_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失败`)
};

export const knowledge_upload_status_processing = /** @type {(inputs: Knowledge_Upload_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`处理中`)
};

export const knowledge_upload_status_uploading = /** @type {(inputs: Knowledge_Upload_Status_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传中`)
};

export const onboarding_company_init_error = /** @type {(inputs: Onboarding_Company_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司创建成功，但未能初始化 onboarding。`)
};

export const onboarding_company_load_error = /** @type {(inputs: Onboarding_Company_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司信息加载失败，请稍后重试。`)
};

export const onboarding_company_name_length_error = /** @type {(inputs: Onboarding_Company_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`公司名称需为 ${i?.min}-${i?.max} 个字符。`)
};

export const onboarding_company_name_label = /** @type {(inputs: Onboarding_Company_Name_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司名称`)
};

export const onboarding_company_name_placeholder = /** @type {(inputs: Onboarding_Company_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入公司名称`)
};

export const onboarding_company_description_label = /** @type {(inputs: Onboarding_Company_Description_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司简介（可选）`)
};

export const onboarding_company_description_placeholder = /** @type {(inputs: Onboarding_Company_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`简单介绍你的公司和团队。`)
};

export const onboarding_company_save_error = /** @type {(inputs: Onboarding_Company_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司信息保存失败，请稍后重试。`)
};

export const onboarding_company_saved = /** @type {(inputs: Onboarding_Company_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司信息已保存。`)
};

export const onboarding_company_setup_subtitle = /** @type {(inputs: Onboarding_Company_Setup_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先完善公司资料，下一步继续设置个人信息。`)
};

export const onboarding_company_setup_title = /** @type {(inputs: Onboarding_Company_Setup_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置公司信息`)
};

export const onboarding_company_submit_create_continue = /** @type {(inputs: Onboarding_Company_Submit_Create_ContinueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建并继续`)
};

export const onboarding_company_submit_next = /** @type {(inputs: Onboarding_Company_Submit_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

export const onboarding_company_website_label = /** @type {(inputs: Onboarding_Company_Website_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司网站（可选）`)
};

export const onboarding_company_welcome_subtitle = /** @type {(inputs: Onboarding_Company_Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`欢迎使用 Lucius，先创建一个工作区再继续设置个人信息。`)
};

export const onboarding_company_welcome_title = /** @type {(inputs: Onboarding_Company_Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建你的首个工作区`)
};

export const onboarding_profile_gate_error = /** @type {(inputs: Onboarding_Profile_Gate_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 onboarding 进度失败，请稍后重试。`)
};

export const profile_avatar_must_be_image = /** @type {(inputs: Profile_Avatar_Must_Be_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`头像文件必须是图片格式。`)
};

export const profile_avatar_preview_alt = /** @type {(inputs: Profile_Avatar_Preview_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`头像预览`)
};

export const profile_avatar_size_limit = /** @type {(inputs: Profile_Avatar_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`头像文件大小不能超过 ${i?.size}。`)
};

export const profile_choose_avatar = /** @type {(inputs: Profile_Choose_AvatarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择头像`)
};

export const profile_display_name_length_error = /** @type {(inputs: Profile_Display_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`昵称需为 ${i?.min}-${i?.max} 个字符。`)
};

export const profile_enter_nickname = /** @type {(inputs: Profile_Enter_NicknameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入您的昵称`)
};

export const profile_init_failed = /** @type {(inputs: Profile_Init_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化资料失败，请稍后重试。`)
};

export const profile_nickname_hint = /** @type {(inputs: Profile_Nickname_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.min}-${i?.max} 个字符，同一工作区昵称不得重复。`)
};

export const profile_nickname_label = /** @type {(inputs: Profile_Nickname_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`昵称`)
};

export const profile_nickname_placeholder = /** @type {(inputs: Profile_Nickname_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的昵称`)
};

export const profile_required_display_name = /** @type {(inputs: Profile_Required_Display_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入昵称。`)
};

export const profile_save_error = /** @type {(inputs: Profile_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`资料保存失败，请稍后重试。`)
};

export const profile_save_success = /** @type {(inputs: Profile_Save_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`资料保存成功。`)
};

export const profile_platform_accounts_title = /** @type {(inputs: Profile_Platform_Accounts_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台账号`)
};

export const profile_platform_account_connect = /** @type {(inputs: Profile_Platform_Account_ConnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关联`)
};

export const profile_platform_account_disconnect = /** @type {(inputs: Profile_Platform_Account_DisconnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`解绑`)
};

export const profile_platform_account_unavailable = /** @type {(inputs: Profile_Platform_Account_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不可用`)
};

export const platform_discord = /** @type {(inputs: Platform_DiscordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discord`)
};

export const platform_feishu = /** @type {(inputs: Platform_FeishuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`飞书`)
};

export const platform_slack = /** @type {(inputs: Platform_SlackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack`)
};

export const platform_telegram = /** @type {(inputs: Platform_TelegramInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram`)
};

export const platform_unknown = /** @type {(inputs: Platform_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知`)
};

export const role_admin = /** @type {(inputs: Role_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin`)
};

export const role_assistant = /** @type {(inputs: Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`助手`)
};

export const role_bot = /** @type {(inputs: Role_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot`)
};

export const role_lucius = /** @type {(inputs: Role_LuciusInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

export const role_staff = /** @type {(inputs: Role_StaffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Staff`)
};

export const role_unknown = /** @type {(inputs: Role_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知`)
};

export const role_user = /** @type {(inputs: Role_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户`)
};

export const settings_back_to_app = /** @type {(inputs: Settings_Back_To_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回 app`)
};

export const settings_nav_event_settings = /** @type {(inputs: Settings_Nav_Event_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件配置`)
};

export const settings_nav_management = /** @type {(inputs: Settings_Nav_ManagementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`管理`)
};

export const settings_nav_member_management = /** @type {(inputs: Settings_Nav_Member_ManagementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人员管理`)
};

export const settings_nav_package = /** @type {(inputs: Settings_Nav_PackageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套餐`)
};

export const settings_nav_profile_settings = /** @type {(inputs: Settings_Nav_Profile_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`个人信息`)
};

export const settings_nav_usage_history = /** @type {(inputs: Settings_Nav_Usage_HistoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用量历史`)
};

export const settings_nav_user_communities = /** @type {(inputs: Settings_Nav_User_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户社区`)
};

export const settings_nav_workgroup_settings = /** @type {(inputs: Settings_Nav_Workgroup_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置`)
};

export const settings_select_company_first = /** @type {(inputs: Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司。`)
};

export const settings_title = /** @type {(inputs: Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置`)
};

export const common_add = /** @type {(inputs: Common_AddInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增`)
};

export const common_days_ago = /** @type {(inputs: Common_Days_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 天前`)
};

export const common_delete = /** @type {(inputs: Common_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除`)
};

export const common_edit = /** @type {(inputs: Common_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑`)
};

export const common_none = /** @type {(inputs: Common_NoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无`)
};

export const common_open = /** @type {(inputs: Common_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开`)
};

export const common_previous = /** @type {(inputs: Common_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一页`)
};

export const common_refresh = /** @type {(inputs: Common_RefreshInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刷新`)
};

export const common_refreshing = /** @type {(inputs: Common_RefreshingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刷新中`)
};

export const common_unknown_user = /** @type {(inputs: Common_Unknown_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知用户`)
};

export const platform_website = /** @type {(inputs: Platform_WebsiteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`网站`)
};

export const role_member = /** @type {(inputs: Role_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member`)
};

export const role_owner = /** @type {(inputs: Role_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

export const workspace_settings_title = /** @type {(inputs: Workspace_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置`)
};

export const workspace_state_ready = /** @type {(inputs: Workspace_State_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可配置`)
};

export const workspace_state_needs_connection = /** @type {(inputs: Workspace_State_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待关联`)
};

export const workspace_state_unavailable = /** @type {(inputs: Workspace_State_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未开放`)
};

export const workspace_empty_ready = /** @type {(inputs: Workspace_Empty_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前平台暂无可选频道。`)
};

export const workspace_empty_unavailable = /** @type {(inputs: Workspace_Empty_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该平台的工作群设置暂不可用。`)
};

export const workspace_empty_needs_connection = /** @type {(inputs: Workspace_Empty_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先完成平台关联，再回来选择工作群。`)
};

export const workspace_stale = /** @type {(inputs: Workspace_StaleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已失联`)
};

export const workspace_save_pending = /** @type {(inputs: Workspace_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中`)
};

export const workspace_badge = /** @type {(inputs: Workspace_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群`)
};

export const workspace_remove = /** @type {(inputs: Workspace_RemoveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移出工作群`)
};

export const workspace_set = /** @type {(inputs: Workspace_SetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设为工作群`)
};

export const workspace_readonly = /** @type {(inputs: Workspace_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只读`)
};

export const workspace_navigate_platform_settings = /** @type {(inputs: Workspace_Navigate_Platform_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前往平台设置`)
};

export const workspace_selected_count = /** @type {(inputs: Workspace_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个工作群`)
};

export const workspace_add_success = /** @type {(inputs: Workspace_Add_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 已设为工作群。`)
};

export const workspace_remove_success = /** @type {(inputs: Workspace_Remove_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 已移出工作群。`)
};

export const workspace_select_company_error = /** @type {(inputs: Workspace_Select_Company_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先在页面顶部选择公司。`)
};

export const workspace_permission_error = /** @type {(inputs: Workspace_Permission_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可修改工作群设置。`)
};

export const workspace_save_error = /** @type {(inputs: Workspace_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存工作群设置失败，请稍后重试。`)
};

export const workspace_summary_selected = /** @type {(inputs: Workspace_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已标记 ${i?.count} 个工作群 channel`)
};

export const workspace_summary_description = /** @type {(inputs: Workspace_Summary_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只有先完成平台关联，才会出现对应平台的可选 channel。一个平台支持设置多个工作群。`)
};

export const workspace_permission_editable = /** @type {(inputs: Workspace_Permission_EditableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前权限：可编辑`)
};

export const workspace_permission_readonly = /** @type {(inputs: Workspace_Permission_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前权限：只读`)
};

export const workspace_member_readonly_hint = /** @type {(inputs: Workspace_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可修改工作群设置；Member 可查看当前已配置的工作群。`)
};

export const feishu_settings_title = /** @type {(inputs: Feishu_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`飞书`)
};

export const feishu_default_chat_type = /** @type {(inputs: Feishu_Default_Chat_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`群聊`)
};

export const feishu_discovered_candidates = /** @type {(inputs: Feishu_Discovered_CandidatesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已发现 ${i?.count} 个飞书工作群候选`)
};

export const feishu_no_available_candidates = /** @type {(inputs: Feishu_No_Available_CandidatesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有可用的飞书工作群`)
};

export const feishu_synced_hint = /** @type {(inputs: Feishu_Synced_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`飞书群已同步到平台频道库，可回到“工作群设置”分区把它们标记为工作群。`)
};

export const feishu_manage_hint = /** @type {(inputs: Feishu_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先完成飞书工作群接入，群聊同步进来后，这里和“工作群设置”都会自动出现可选项。`)
};

export const feishu_readonly_hint = /** @type {(inputs: Feishu_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号为只读，可在这里查看已同步的飞书群聊。`)
};

export const feishu_empty_synced = /** @type {(inputs: Feishu_Empty_SyncedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前暂无已同步的飞书群聊。`)
};

export const feishu_bot_add_button = /** @type {(inputs: Feishu_Bot_Add_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增 Bot`)
};

export const feishu_bot_summary_connected_title = /** @type {(inputs: Feishu_Bot_Summary_Connected_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已连接 Bot`)
};

export const feishu_bot_summary_connected_hint = /** @type {(inputs: Feishu_Bot_Summary_Connected_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已配置 ${i?.count} 个 Bot`)
};

export const feishu_bot_summary_default_title = /** @type {(inputs: Feishu_Bot_Summary_Default_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认 Bot`)
};

export const feishu_bot_summary_default_hint = /** @type {(inputs: Feishu_Bot_Summary_Default_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有默认 Bot`)
};

export const feishu_bot_summary_channels_bound_title = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已绑定频道`)
};

export const feishu_bot_summary_channels_bound_hint = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个频道未归属`)
};

export const feishu_bot_summary_last_error_title = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常 Bot`)
};

export const feishu_bot_summary_last_error_hint = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前需要关注的异常 Bot 数`)
};

export const feishu_bot_member_readonly_hint = /** @type {(inputs: Feishu_Bot_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只有 Owner/Admin 可以管理 Bot；Member 只读查看当前路由关系。`)
};

export const feishu_bot_empty_title = /** @type {(inputs: Feishu_Bot_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有 Feishu Bot`)
};

export const feishu_bot_empty_manage_hint = /** @type {(inputs: Feishu_Bot_Empty_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先新增 Bot，后续验证、重启和频道归属都在这个面板完成。`)
};

export const feishu_bot_empty_readonly_hint = /** @type {(inputs: Feishu_Bot_Empty_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前公司还没有配置 Feishu Bot。`)
};

export const feishu_bot_dialog_create_title = /** @type {(inputs: Feishu_Bot_Dialog_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增 Feishu Bot`)
};

export const feishu_bot_dialog_edit_title = /** @type {(inputs: Feishu_Bot_Dialog_Edit_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑 Feishu Bot`)
};

export const feishu_bot_form_name_label = /** @type {(inputs: Feishu_Bot_Form_Name_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot 名称`)
};

export const feishu_bot_form_name_placeholder = /** @type {(inputs: Feishu_Bot_Form_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Support Bot`)
};

export const feishu_bot_form_app_id_label = /** @type {(inputs: Feishu_Bot_Form_App_Id_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App ID`)
};

export const feishu_bot_form_app_id_placeholder = /** @type {(inputs: Feishu_Bot_Form_App_Id_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`cli_xxx`)
};

export const feishu_bot_form_app_secret_label = /** @type {(inputs: Feishu_Bot_Form_App_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App Secret`)
};

export const feishu_bot_form_app_secret_placeholder = /** @type {(inputs: Feishu_Bot_Form_App_Secret_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入应用密钥`)
};

export const feishu_bot_form_default_label = /** @type {(inputs: Feishu_Bot_Form_Default_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设为默认 Bot`)
};

export const feishu_bot_form_enabled_label = /** @type {(inputs: Feishu_Bot_Form_Enabled_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用状态`)
};

export const feishu_bot_form_rotate_secret_label = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更换密钥`)
};

export const feishu_bot_form_rotate_secret_hint = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只有在需要替换当前密钥时才输入新的 secret。`)
};

export const feishu_bot_form_rotate_secret_show = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_ShowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更换密钥`)
};

export const feishu_bot_form_rotate_secret_hide = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HideInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消更换`)
};

export const feishu_bot_form_rotated_secret_label = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新的 App Secret`)
};

export const feishu_bot_form_rotated_secret_placeholder = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入新的应用密钥`)
};

export const feishu_bot_form_name_required = /** @type {(inputs: Feishu_Bot_Form_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入 Bot 名称。`)
};

export const feishu_bot_form_app_id_required = /** @type {(inputs: Feishu_Bot_Form_App_Id_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入 App ID。`)
};

export const feishu_bot_form_app_secret_required = /** @type {(inputs: Feishu_Bot_Form_App_Secret_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入 App Secret。`)
};

export const feishu_bot_form_rotated_secret_required = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入新的 App Secret。`)
};

export const feishu_bot_form_submitting = /** @type {(inputs: Feishu_Bot_Form_SubmittingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

export const feishu_bot_create = /** @type {(inputs: Feishu_Bot_CreateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建 Bot`)
};

export const feishu_bot_default_badge = /** @type {(inputs: Feishu_Bot_Default_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认`)
};

export const feishu_bot_status_active = /** @type {(inputs: Feishu_Bot_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已启用`)
};

export const feishu_bot_status_disabled = /** @type {(inputs: Feishu_Bot_Status_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已停用`)
};

export const feishu_bot_status_error = /** @type {(inputs: Feishu_Bot_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常`)
};

export const feishu_bot_status_pending = /** @type {(inputs: Feishu_Bot_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待确认`)
};

export const feishu_bot_action_verify = /** @type {(inputs: Feishu_Bot_Action_VerifyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证`)
};

export const feishu_bot_action_verifying = /** @type {(inputs: Feishu_Bot_Action_VerifyingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证中...`)
};

export const feishu_bot_action_restart = /** @type {(inputs: Feishu_Bot_Action_RestartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重启`)
};

export const feishu_bot_action_restarting = /** @type {(inputs: Feishu_Bot_Action_RestartingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重启中...`)
};

export const feishu_bot_action_enable = /** @type {(inputs: Feishu_Bot_Action_EnableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用`)
};

export const feishu_bot_action_disable = /** @type {(inputs: Feishu_Bot_Action_DisableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停用`)
};

export const feishu_bot_action_updating = /** @type {(inputs: Feishu_Bot_Action_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新中...`)
};

export const feishu_bot_meta_verified_at = /** @type {(inputs: Feishu_Bot_Meta_Verified_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近验证`)
};

export const feishu_bot_meta_connected_at = /** @type {(inputs: Feishu_Bot_Meta_Connected_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近建连`)
};

export const feishu_bot_meta_heartbeat_at = /** @type {(inputs: Feishu_Bot_Meta_Heartbeat_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近心跳`)
};

export const feishu_bot_meta_event_at = /** @type {(inputs: Feishu_Bot_Meta_Event_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近事件`)
};

export const feishu_bot_meta_never = /** @type {(inputs: Feishu_Bot_Meta_NeverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`从未`)
};

export const feishu_bot_last_error_label = /** @type {(inputs: Feishu_Bot_Last_Error_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近错误`)
};

export const feishu_bot_assigned_channels_title = /** @type {(inputs: Feishu_Bot_Assigned_Channels_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`归属频道`)
};

export const feishu_bot_assigned_channels_count = /** @type {(inputs: Feishu_Bot_Assigned_Channels_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个频道`)
};

export const feishu_bot_assigned_channels_empty = /** @type {(inputs: Feishu_Bot_Assigned_Channels_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前还没有频道路由到这个 Bot。`)
};

export const feishu_bot_create_success = /** @type {(inputs: Feishu_Bot_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已创建。`)
};

export const feishu_bot_update_success = /** @type {(inputs: Feishu_Bot_Update_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已更新。`)
};

export const feishu_bot_save_error = /** @type {(inputs: Feishu_Bot_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存 Feishu Bot 失败。`)
};

export const feishu_bot_verify_success = /** @type {(inputs: Feishu_Bot_Verify_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已触发 Feishu Bot 验证。`)
};

export const feishu_bot_verify_error = /** @type {(inputs: Feishu_Bot_Verify_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证 Feishu Bot 失败。`)
};

export const feishu_bot_enable_success = /** @type {(inputs: Feishu_Bot_Enable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已启用。`)
};

export const feishu_bot_enable_error = /** @type {(inputs: Feishu_Bot_Enable_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用 Feishu Bot 失败。`)
};

export const feishu_bot_restart_success = /** @type {(inputs: Feishu_Bot_Restart_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已触发 Feishu Bot 重启。`)
};

export const feishu_bot_restart_error = /** @type {(inputs: Feishu_Bot_Restart_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重启 Feishu Bot 失败。`)
};

export const feishu_bot_disable_success = /** @type {(inputs: Feishu_Bot_Disable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu Bot 已停用。`)
};

export const feishu_bot_disable_error = /** @type {(inputs: Feishu_Bot_Disable_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停用 Feishu Bot 失败。`)
};

export const feishu_bot_restart_confirm_title = /** @type {(inputs: Feishu_Bot_Restart_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认重启这个 Bot？`)
};

export const feishu_bot_restart_confirm_description = /** @type {(inputs: Feishu_Bot_Restart_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会重建连接，用于恢复当前运行状态。`)
};

export const feishu_bot_disable_confirm_title = /** @type {(inputs: Feishu_Bot_Disable_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认停用这个 Bot？`)
};

export const feishu_bot_disable_confirm_description = /** @type {(inputs: Feishu_Bot_Disable_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停用后，这个 Bot 不再处理任何频道，直到再次启用。`)
};

export const billing_usage_title = /** @type {(inputs: Billing_Usage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用量历史`)
};

export const billing_current_period = /** @type {(inputs: Billing_Current_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期`)
};

export const billing_period_key = /** @type {(inputs: Billing_Period_KeyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`账期 key：${i?.key}`)
};

export const billing_period_key_later = /** @type {(inputs: Billing_Period_Key_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期 key 将在后续账本明细页展示`)
};

export const billing_used_actions_title = /** @type {(inputs: Billing_Used_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本月已用 actions`)
};

export const billing_blocked_actions = /** @type {(inputs: Billing_Blocked_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已有 ${i?.count} 次因额度策略被拦截`)
};

export const billing_no_blocked_actions = /** @type {(inputs: Billing_No_Blocked_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前没有被 stop-service 拦截的动作`)
};

export const billing_overage_title = /** @type {(inputs: Billing_Overage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已产生 overage`)
};

export const billing_projected_overage = /** @type {(inputs: Billing_Projected_OverageInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`预计超额费用 ${i?.amount}`)
};

export const billing_no_overage_yet = /** @type {(inputs: Billing_No_Overage_YetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期尚未产生超额费用`)
};

export const billing_state_title = /** @type {(inputs: Billing_State_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前状态`)
};

export const billing_estimated_invoice_title = /** @type {(inputs: Billing_Estimated_Invoice_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预计账单`)
};

export const billing_auto_charge = /** @type {(inputs: Billing_Auto_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动扣费`)
};

export const billing_stop_service = /** @type {(inputs: Billing_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达量停服`)
};

export const billing_stripe_invoices_title = /** @type {(inputs: Billing_Stripe_Invoices_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stripe 官方账单`)
};

export const billing_stripe_invoices_hint = /** @type {(inputs: Billing_Stripe_Invoices_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可直接查看 Hosted Invoice、下载 PDF 和收据`)
};

export const billing_stripe_empty = /** @type {(inputs: Billing_Stripe_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无可导出的 Stripe 官方账单。`)
};

export const billing_snapshot_title = /** @type {(inputs: Billing_Snapshot_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期快照`)
};

export const billing_snapshot_hint = /** @type {(inputs: Billing_Snapshot_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内部核对用，不替代 Stripe 官方 invoice`)
};

export const billing_snapshot_export_title = /** @type {(inputs: Billing_Snapshot_Export_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出当前账期 CSV 快照`)
};

export const billing_snapshot_export = /** @type {(inputs: Billing_Snapshot_ExportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出 CSV 快照`)
};

export const billing_table_project = /** @type {(inputs: Billing_Table_ProjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目`)
};

export const billing_table_quantity = /** @type {(inputs: Billing_Table_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数量`)
};

export const billing_table_unit_price = /** @type {(inputs: Billing_Table_Unit_PriceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`单价`)
};

export const billing_table_amount = /** @type {(inputs: Billing_Table_AmountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`金额`)
};

export const billing_estimated_total = /** @type {(inputs: Billing_Estimated_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预计结算总计`)
};

export const billing_period_export_hint = /** @type {(inputs: Billing_Period_Export_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期导出可直接留档`)
};

export const billing_export_success = /** @type {(inputs: Billing_Export_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期账单明细已导出。`)
};

export const billing_export_error = /** @type {(inputs: Billing_Export_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出账单明细失败，请稍后重试。`)
};

export const billing_invoice_status_paid = /** @type {(inputs: Billing_Invoice_Status_PaidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已支付`)
};

export const billing_invoice_status_open = /** @type {(inputs: Billing_Invoice_Status_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待支付`)
};

export const billing_invoice_status_void = /** @type {(inputs: Billing_Invoice_Status_VoidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已作废`)
};

export const billing_invoice_status_uncollectible = /** @type {(inputs: Billing_Invoice_Status_UncollectibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法收款`)
};

export const billing_invoice_status_draft = /** @type {(inputs: Billing_Invoice_Status_DraftInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`草稿`)
};

export const billing_invoice_status_unknown = /** @type {(inputs: Billing_Invoice_Status_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知状态`)
};

export const billing_created_on = /** @type {(inputs: Billing_Created_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`创建于 ${i?.date}`)
};

export const billing_paid_on = /** @type {(inputs: Billing_Paid_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`付款日期：${i?.date}`)
};

export const billing_view_invoice = /** @type {(inputs: Billing_View_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看账单`)
};

export const billing_download_invoice = /** @type {(inputs: Billing_Download_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下载账单`)
};

export const billing_download_receipt = /** @type {(inputs: Billing_Download_ReceiptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下载收据`)
};

export const billing_plan_title = /** @type {(inputs: Billing_Plan_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套餐`)
};

export const billing_display_free_active = /** @type {(inputs: Billing_Display_Free_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`免费版`)
};

export const billing_display_free_limit_reached = /** @type {(inputs: Billing_Display_Free_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已达免费额度`)
};

export const billing_display_basic_trial = /** @type {(inputs: Billing_Display_Basic_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic 试用中`)
};

export const billing_display_basic_active = /** @type {(inputs: Billing_Display_Basic_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic 生效中`)
};

export const billing_display_basic_canceling = /** @type {(inputs: Billing_Display_Basic_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic 已设为到期取消`)
};

export const billing_display_pro_trial = /** @type {(inputs: Billing_Display_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro 试用中`)
};

export const billing_display_pro_active = /** @type {(inputs: Billing_Display_Pro_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro 生效中`)
};

export const billing_display_pro_canceling = /** @type {(inputs: Billing_Display_Pro_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro 已设为到期取消`)
};

export const billing_display_promo_only_basic = /** @type {(inputs: Billing_Display_Promo_Only_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Promo Basic`)
};

export const billing_display_past_due = /** @type {(inputs: Billing_Display_Past_DueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支付异常`)
};

export const billing_display_expired = /** @type {(inputs: Billing_Display_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已失效`)
};

export const billing_trial_ends_on = /** @type {(inputs: Billing_Trial_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`试用将于 ${i?.date} 结束`)
};

export const billing_trialing = /** @type {(inputs: Billing_TrialingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`试用中`)
};

export const billing_ends_on = /** @type {(inputs: Billing_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`将于 ${i?.date} 到期`)
};

export const billing_stop_after_period = /** @type {(inputs: Billing_Stop_After_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期结束后停止`)
};

export const billing_limit_reached = /** @type {(inputs: Billing_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已达到免费额度上限`)
};

export const billing_current_period_normal = /** @type {(inputs: Billing_Current_Period_NormalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期正常`)
};

export const billing_next_billing = /** @type {(inputs: Billing_Next_BillingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`下次结算 ${i?.date}`)
};

export const billing_current_workspace = /** @type {(inputs: Billing_Current_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前工作区`)
};

export const billing_start_basic_trial = /** @type {(inputs: Billing_Start_Basic_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始 Basic 试用`)
};

export const billing_start_pro_trial = /** @type {(inputs: Billing_Start_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始 Pro 试用`)
};

export const billing_manage_payment_method = /** @type {(inputs: Billing_Manage_Payment_MethodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`管理支付方式`)
};

export const billing_account_label = /** @type {(inputs: Billing_Account_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账单账户`)
};

export const billing_metric_projected = /** @type {(inputs: Billing_Metric_ProjectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected`)
};

export const billing_metric_admins = /** @type {(inputs: Billing_Metric_AdminsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admins`)
};

export const billing_metric_platforms = /** @type {(inputs: Billing_Metric_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms`)
};

export const billing_metric_overage = /** @type {(inputs: Billing_Metric_OverageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage`)
};

export const billing_monthly_price = /** @type {(inputs: Billing_Monthly_PriceInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / 月`)
};

export const billing_actions_label = /** @type {(inputs: Billing_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

export const billing_actions_included_month = /** @type {(inputs: Billing_Actions_Included_MonthInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`/ ${i?.count} 本月 included`)
};

export const billing_overage_summary = /** @type {(inputs: Billing_Overage_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超额 ${i?.count} 次，预计 ${i?.amount}`)
};

export const billing_no_overage_fee = /** @type {(inputs: Billing_No_Overage_FeeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前未产生超额费用`)
};

export const billing_usage_rate = /** @type {(inputs: Billing_Usage_RateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`使用率 ${i?.percent}%`)
};

export const billing_extra_admin = /** @type {(inputs: Billing_Extra_AdminInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`管理员加购 ${i?.count}`)
};

export const billing_no_extra_admin = /** @type {(inputs: Billing_No_Extra_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无管理员加购`)
};

export const billing_extra_platform = /** @type {(inputs: Billing_Extra_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`平台加购 ${i?.count}`)
};

export const billing_no_extra_platform = /** @type {(inputs: Billing_No_Extra_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无平台加购`)
};

export const billing_overage_policy_title = /** @type {(inputs: Billing_Overage_Policy_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额策略`)
};

export const billing_overage_policy_subtitle = /** @type {(inputs: Billing_Overage_Policy_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达量后的处理方式`)
};

export const billing_free_fixed_stop_service = /** @type {(inputs: Billing_Free_Fixed_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`免费版固定为达量停用。`)
};

export const billing_policy_stop_service_title = /** @type {(inputs: Billing_Policy_Stop_Service_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达量停服`)
};

export const billing_policy_stop_service_desc = /** @type {(inputs: Billing_Policy_Stop_Service_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达到 included quota 后停止新的 billable action`)
};

export const billing_policy_auto_charge_title = /** @type {(inputs: Billing_Policy_Auto_Charge_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动扣费`)
};

export const billing_policy_auto_charge_desc = /** @type {(inputs: Billing_Policy_Auto_Charge_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额部分按账期自动结算`)
};

export const billing_monthly_overage_cap = /** @type {(inputs: Billing_Monthly_Overage_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`月度超额上限（USD）`)
};

export const billing_example_cap = /** @type {(inputs: Billing_Example_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`例如 500`)
};

export const billing_save_policy = /** @type {(inputs: Billing_Save_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存策略`)
};

export const billing_current_plan = /** @type {(inputs: Billing_Current_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前套餐`)
};

export const billing_overage_per_action = /** @type {(inputs: Billing_Overage_Per_ActionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / 次`)
};

export const billing_unsupported = /** @type {(inputs: Billing_UnsupportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不支持`)
};

export const billing_addon_summary = /** @type {(inputs: Billing_Addon_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`平台加购 ${i?.platform} / 月 · 管理员加购 ${i?.admin} / 月`)
};

export const billing_start_trial = /** @type {(inputs: Billing_Start_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始试用`)
};

export const member_management_title = /** @type {(inputs: Member_Management_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人员管理`)
};

export const member_management_add_member = /** @type {(inputs: Member_Management_Add_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加人员`)
};

export const member_management_table_id = /** @type {(inputs: Member_Management_Table_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ID`)
};

export const member_management_table_platforms = /** @type {(inputs: Member_Management_Table_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台`)
};

export const member_management_table_role = /** @type {(inputs: Member_Management_Table_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`角色`)
};

export const member_management_table_recent_activity = /** @type {(inputs: Member_Management_Table_Recent_ActivityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近活跃`)
};

export const member_management_table_actions = /** @type {(inputs: Member_Management_Table_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`操作`)
};

export const member_management_remove_current_user = /** @type {(inputs: Member_Management_Remove_Current_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前登录账号不可删除`)
};

export const member_management_remove_owner = /** @type {(inputs: Member_Management_Remove_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner 不可删除`)
};

export const member_management_admin_cancel_member_invite_only = /** @type {(inputs: Member_Management_Admin_Cancel_Member_Invite_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 仅可取消 Member 邀请`)
};

export const member_management_admin_remove_member_only = /** @type {(inputs: Member_Management_Admin_Remove_Member_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 仅可删除 Member`)
};

export const member_management_owner_only_action = /** @type {(inputs: Member_Management_Owner_Only_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可操作`)
};

export const member_management_menu_hint_current_account = /** @type {(inputs: Member_Management_Menu_Hint_Current_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号`)
};

export const member_management_menu_hint_owner = /** @type {(inputs: Member_Management_Menu_Hint_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

export const member_management_menu_hint_no_permission = /** @type {(inputs: Member_Management_Menu_Hint_No_PermissionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无权限`)
};

export const member_management_update_current_user_role = /** @type {(inputs: Member_Management_Update_Current_User_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前登录账号不可修改权限`)
};

export const member_management_update_owner_role = /** @type {(inputs: Member_Management_Update_Owner_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner 权限不可修改`)
};

export const member_management_admin_update_member_invite_only = /** @type {(inputs: Member_Management_Admin_Update_Member_Invite_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 仅可调整 Member 邀请`)
};

export const member_management_admin_update_member_only = /** @type {(inputs: Member_Management_Admin_Update_Member_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 仅可调整 Member`)
};

export const member_management_status_invited = /** @type {(inputs: Member_Management_Status_InvitedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待邀请`)
};

export const member_management_status_joined = /** @type {(inputs: Member_Management_Status_JoinedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已加入`)
};

export const member_management_recent_pending_join = /** @type {(inputs: Member_Management_Recent_Pending_JoinInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待加入`)
};

export const member_management_recent_unrecorded = /** @type {(inputs: Member_Management_Recent_UnrecordedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未记录`)
};

export const member_management_fallback_name = /** @type {(inputs: Member_Management_Fallback_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员`)
};

export const member_management_invalid_email = /** @type {(inputs: Member_Management_Invalid_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入合法邮箱地址。`)
};

export const member_management_invite_error = /** @type {(inputs: Member_Management_Invite_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送邀请失败，请稍后重试。`)
};

export const member_management_role_update_error = /** @type {(inputs: Member_Management_Role_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新角色失败，请稍后重试。`)
};

export const member_management_resend_error = /** @type {(inputs: Member_Management_Resend_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新邀请失败，请稍后重试。`)
};

export const member_management_link_telegram_error = /** @type {(inputs: Member_Management_Link_Telegram_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定 Telegram 账号失败。`)
};

export const member_management_missing_current_member_bind = /** @type {(inputs: Member_Management_Missing_Current_Member_BindInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未识别当前成员身份，暂无法绑定账号。`)
};

export const member_management_link_platform_error = /** @type {(inputs: Member_Management_Link_Platform_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定平台账号失败。`)
};

export const member_management_platform_bound = /** @type {(inputs: Member_Management_Platform_BoundInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 账号已绑定。`)
};

export const member_management_platform_bind_failed = /** @type {(inputs: Member_Management_Platform_Bind_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 账号绑定失败，请稍后重试。`)
};

export const member_management_platform_unlinked = /** @type {(inputs: Member_Management_Platform_UnlinkedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`未绑定 ${i?.platform} 账号。`)
};

export const member_management_oauth_link_hint = /** @type {(inputs: Member_Management_Oauth_Link_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`点击后将跳转到 ${i?.platform} 登录授权页，授权成功后自动完成账号关联。`)
};

export const member_management_missing_current_member_unbind = /** @type {(inputs: Member_Management_Missing_Current_Member_UnbindInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未识别当前成员身份，暂无法解绑账号。`)
};

export const member_management_unlink_platform_error = /** @type {(inputs: Member_Management_Unlink_Platform_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`解绑 ${i?.platform} 账号失败。`)
};

export const member_management_cancel_invite = /** @type {(inputs: Member_Management_Cancel_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消邀请`)
};

export const member_management_remove_member = /** @type {(inputs: Member_Management_Remove_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除成员`)
};

export const member_management_actions_title = /** @type {(inputs: Member_Management_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员操作`)
};

export const member_management_actions_menu_aria = /** @type {(inputs: Member_Management_Actions_Menu_AriaInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.email} 的操作菜单`)
};

export const member_management_accounts_label = /** @type {(inputs: Member_Management_Accounts_LabelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`账号：${i?.accounts}`)
};

export const member_management_unlinked = /** @type {(inputs: Member_Management_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未关联`)
};

export const member_management_adjust_invite_role = /** @type {(inputs: Member_Management_Adjust_Invite_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`调整邀请权限`)
};

export const member_management_change_role = /** @type {(inputs: Member_Management_Change_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`变更权限`)
};

export const member_management_resending_invite = /** @type {(inputs: Member_Management_Resending_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新邀请中...`)
};

export const member_management_resend_invite = /** @type {(inputs: Member_Management_Resend_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新邀请`)
};

export const member_management_my_bindings = /** @type {(inputs: Member_Management_My_BindingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`我的平台账号关联`)
};

export const member_management_no_current_member = /** @type {(inputs: Member_Management_No_Current_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号尚未映射到公司成员，暂无法执行账号关联。`)
};

export const member_management_linked_platforms = /** @type {(inputs: Member_Management_Linked_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已关联平台：`)
};

export const member_management_telegram_linked = /** @type {(inputs: Member_Management_Telegram_LinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已绑定 Telegram 账号。`)
};

export const member_management_telegram_unlinked = /** @type {(inputs: Member_Management_Telegram_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未绑定 Telegram 账号。`)
};

export const member_management_telegram_unavailable = /** @type {(inputs: Member_Management_Telegram_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前环境未启用 Telegram 账号绑定。`)
};

export const member_management_unlinking = /** @type {(inputs: Member_Management_UnlinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`解绑中...`)
};

export const member_management_unlink_platform = /** @type {(inputs: Member_Management_Unlink_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`解绑 ${i?.platform}`)
};

export const member_management_login_and_link = /** @type {(inputs: Member_Management_Login_And_LinkInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`使用 ${i?.platform} 登录并关联`)
};

export const member_management_linking = /** @type {(inputs: Member_Management_LinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定中...`)
};

export const member_management_binding_wait = /** @type {(inputs: Member_Management_Binding_WaitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在校验并绑定账号，请稍候...`)
};

export const member_management_invite_dialog_title = /** @type {(inputs: Member_Management_Invite_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请成员`)
};

export const member_management_invite_dialog_desc = /** @type {(inputs: Member_Management_Invite_Dialog_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择邀请方式并设置权限。`)
};

export const member_management_invite_mode_label = /** @type {(inputs: Member_Management_Invite_Mode_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请方式`)
};

export const member_management_invite_mode_email = /** @type {(inputs: Member_Management_Invite_Mode_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮件邀请`)
};

export const member_management_invite_mode_link = /** @type {(inputs: Member_Management_Invite_Mode_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接`)
};

export const member_management_invite_mode_link_hint = /** @type {(inputs: Member_Management_Invite_Mode_Link_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该链接 24 小时内有效。拿到链接的人注册或登录后，会直接加入当前组织。`)
};

export const member_management_email_label = /** @type {(inputs: Member_Management_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱`)
};

export const member_management_role_label = /** @type {(inputs: Member_Management_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`权限`)
};

export const member_management_role_placeholder = /** @type {(inputs: Member_Management_Role_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择权限`)
};

export const member_management_generate_invite_link = /** @type {(inputs: Member_Management_Generate_Invite_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成邀请链接`)
};

export const member_management_invite_link_generating = /** @type {(inputs: Member_Management_Invite_Link_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成中...`)
};

export const member_management_copy_invite_link = /** @type {(inputs: Member_Management_Copy_Invite_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制邀请链接`)
};

export const member_management_invite_link_label = /** @type {(inputs: Member_Management_Invite_Link_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接`)
};

export const member_management_invite_link_copied = /** @type {(inputs: Member_Management_Invite_Link_CopiedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接已复制，24 小时内有效。`)
};

export const member_management_invite_link_error = /** @type {(inputs: Member_Management_Invite_Link_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成邀请链接失败，请稍后重试。`)
};

export const member_management_invite_link_copy_failed = /** @type {(inputs: Member_Management_Invite_Link_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制邀请链接失败，请手动复制。`)
};

export const member_management_send_invite = /** @type {(inputs: Member_Management_Send_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送邀请`)
};

export const member_management_sending_invite = /** @type {(inputs: Member_Management_Sending_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送中...`)
};

export const member_management_role_dialog_desc = /** @type {(inputs: Member_Management_Role_Dialog_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.email} 当前为 ${i?.role}。`)
};

export const member_management_role_dialog_empty_desc = /** @type {(inputs: Member_Management_Role_Dialog_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择新的成员权限。`)
};

export const member_management_admin_quota_full_update = /** @type {(inputs: Member_Management_Admin_Quota_Full_UpdateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin 配额已满（${i?.count}/${i?.limit}），请调整套餐或改为 Member。`)
};

export const member_management_admin_quota_full_invite = /** @type {(inputs: Member_Management_Admin_Quota_Full_InviteInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin 配额已满（${i?.count}/${i?.limit}），请调整套餐或改邀 Member。`)
};

export const member_management_admin_quota_hint = /** @type {(inputs: Member_Management_Admin_Quota_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 配额已满，请先释放名额后再调整。`)
};

export const member_management_avatar_alt = /** @type {(inputs: Member_Management_Avatar_AltInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 头像`)
};

export const member_management_save_role = /** @type {(inputs: Member_Management_Save_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存权限`)
};

export const member_invite_invalid_title = /** @type {(inputs: Member_Invite_Invalid_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接不可用`)
};

export const member_invite_invalid_desc = /** @type {(inputs: Member_Invite_Invalid_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个邀请链接无效、已过期，或对应邀请已经不存在。`)
};

export const member_invite_switch_account_error = /** @type {(inputs: Member_Invite_Switch_Account_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换账号失败，请稍后重试。`)
};

export const member_invite_accept_error = /** @type {(inputs: Member_Invite_Accept_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接受邀请失败，请稍后重试。`)
};

export const member_invite_badge = /** @type {(inputs: Member_Invite_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace Invite`)
};

export const member_invite_summary = /** @type {(inputs: Member_Invite_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`这个邀请链接会把登录后的用户以 ${i?.role} 身份加入当前 Lucius 工作区。`)
};

export const member_invite_role_label = /** @type {(inputs: Member_Invite_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请权限`)
};

export const member_invite_expiry_label = /** @type {(inputs: Member_Invite_Expiry_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失效时间`)
};

export const member_invite_status_label = /** @type {(inputs: Member_Invite_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前状态`)
};

export const member_invite_joined_title = /** @type {(inputs: Member_Invite_Joined_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已生效`)
};

export const member_invite_joined_desc = /** @type {(inputs: Member_Invite_Joined_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号已经在这个工作区里，可以直接进入工作台继续操作。`)
};

export const member_invite_joined_badge = /** @type {(inputs: Member_Invite_Joined_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号已加入该工作区`)
};

export const member_invite_expired_title = /** @type {(inputs: Member_Invite_Expired_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已过期`)
};

export const member_invite_expired_desc = /** @type {(inputs: Member_Invite_Expired_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该链接已经超过有效期，请联系管理员重新生成邀请链接。`)
};

export const member_invite_cancelled_title = /** @type {(inputs: Member_Invite_Cancelled_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已取消`)
};

export const member_invite_cancelled_desc = /** @type {(inputs: Member_Invite_Cancelled_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`管理员已经取消这条邀请，请联系对方重新发起。`)
};

export const member_invite_used_title = /** @type {(inputs: Member_Invite_Used_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已处理`)
};

export const member_invite_used_desc = /** @type {(inputs: Member_Invite_Used_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这条邀请已经被接受，当前账号不能再次使用该链接。`)
};

export const member_invite_email_mismatch_title = /** @type {(inputs: Member_Invite_Email_Mismatch_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号不匹配`)
};

export const member_invite_email_mismatch_desc = /** @type {(inputs: Member_Invite_Email_Mismatch_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`请使用 ${i?.email} 登录后再接受邀请。`)
};

export const member_invite_ready_title = /** @type {(inputs: Member_Invite_Ready_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认加入工作区`)
};

export const member_invite_ready_desc = /** @type {(inputs: Member_Invite_Ready_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号已登录，系统会自动把你加入当前组织；如果没有成功，可手动重试。`)
};

export const member_invite_login_title = /** @type {(inputs: Member_Invite_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录后加入`)
};

export const member_invite_login_desc = /** @type {(inputs: Member_Invite_Login_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先注册或登录，系统会在成功登录后自动把你加入当前组织。`)
};

export const member_invite_open_workspace = /** @type {(inputs: Member_Invite_Open_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`进入工作台`)
};

export const member_invite_switching_account = /** @type {(inputs: Member_Invite_Switching_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换中...`)
};

export const member_invite_switch_account = /** @type {(inputs: Member_Invite_Switch_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`退出并切换账号`)
};

export const member_invite_accepting = /** @type {(inputs: Member_Invite_AcceptingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入中...`)
};

export const member_invite_accept_action = /** @type {(inputs: Member_Invite_Accept_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试加入组织`)
};

export const member_invite_login_action = /** @type {(inputs: Member_Invite_Login_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录并继续`)
};

export const member_invite_back_dashboard = /** @type {(inputs: Member_Invite_Back_DashboardInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回工作台`)
};

export const telegram_widget_load_error = /** @type {(inputs: Telegram_Widget_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载 Telegram 登录组件失败，请检查网络后重试。`)
};

export const telegram_settings_group = /** @type {(inputs: Telegram_Settings_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`群组`)
};

export const telegram_settings_supergroup = /** @type {(inputs: Telegram_Settings_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超级群组`)
};

export const telegram_settings_channel = /** @type {(inputs: Telegram_Settings_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道`)
};

export const telegram_settings_private = /** @type {(inputs: Telegram_Settings_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私聊`)
};

export const telegram_settings_unknown = /** @type {(inputs: Telegram_Settings_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知`)
};

export const telegram_settings_status_pending = /** @type {(inputs: Telegram_Settings_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`等待 bot 入群`)
};

export const telegram_settings_status_fulfilled = /** @type {(inputs: Telegram_Settings_Status_FulfilledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已完成绑定`)
};

export const telegram_settings_status_expired = /** @type {(inputs: Telegram_Settings_Status_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已过期`)
};

export const telegram_settings_status_cancelled = /** @type {(inputs: Telegram_Settings_Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已取消`)
};

export const telegram_settings_status_failed = /** @type {(inputs: Telegram_Settings_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定失败`)
};

export const telegram_settings_load_config_error = /** @type {(inputs: Telegram_Settings_Load_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Telegram 集成配置失败。`)
};

export const telegram_settings_load_bound_channels_error = /** @type {(inputs: Telegram_Settings_Load_Bound_Channels_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取已绑定 Telegram 社区失败。`)
};

export const telegram_settings_load_candidates_error = /** @type {(inputs: Telegram_Settings_Load_Candidates_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Telegram 群列表失败。`)
};

export const telegram_settings_session_expired = /** @type {(inputs: Telegram_Settings_Session_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram 会话已过期，请重新登录。`)
};

export const telegram_settings_select_company_top = /** @type {(inputs: Telegram_Settings_Select_Company_TopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先在顶部选择要绑定的公司。`)
};

export const telegram_settings_login_success = /** @type {(inputs: Telegram_Settings_Login_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录成功，请继续将 bot 添加到目标社区。`)
};

export const telegram_settings_create_session_error = /** @type {(inputs: Telegram_Settings_Create_Session_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建 Telegram 集成会话失败。`)
};

export const telegram_settings_create_binding_intent_error = /** @type {(inputs: Telegram_Settings_Create_Binding_Intent_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建 Telegram 绑定意图失败。`)
};

export const telegram_settings_auto_bind_success_named = /** @type {(inputs: Telegram_Settings_Auto_Bind_Success_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已自动绑定社区：${i?.name}`)
};

export const telegram_settings_auto_bind_success = /** @type {(inputs: Telegram_Settings_Auto_Bind_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram 社区已自动绑定到当前公司。`)
};

export const telegram_settings_auto_bind_expired = /** @type {(inputs: Telegram_Settings_Auto_Bind_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动绑定意图已过期，请重新登录后再试。`)
};

export const telegram_settings_auto_bind_incomplete = /** @type {(inputs: Telegram_Settings_Auto_Bind_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动绑定未完成，请检查 bot 是否已加入目标社区后重试。`)
};

export const telegram_settings_poll_status_error = /** @type {(inputs: Telegram_Settings_Poll_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查询自动绑定状态失败。`)
};

export const telegram_settings_select_company_first = /** @type {(inputs: Telegram_Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司。`)
};

export const telegram_settings_open_telegram_confirm = /** @type {(inputs: Telegram_Settings_Open_Telegram_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已打开 Telegram，请在目标社区中确认添加 bot。`)
};

export const telegram_settings_login_first = /** @type {(inputs: Telegram_Settings_Login_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先完成 Telegram 登录。`)
};

export const telegram_settings_open_telegram_add_bot = /** @type {(inputs: Telegram_Settings_Open_Telegram_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已打开 Telegram，请将 bot 添加到目标社区。`)
};

export const telegram_settings_add_community = /** @type {(inputs: Telegram_Settings_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加社区`)
};

export const telegram_settings_empty_with_company = /** @type {(inputs: Telegram_Settings_Empty_With_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无社区，点击右上角添加社区。`)
};

export const telegram_settings_empty_without_company = /** @type {(inputs: Telegram_Settings_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司后再添加社区。`)
};

export const telegram_settings_dialog_title = /** @type {(inputs: Telegram_Settings_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加 Telegram 社区`)
};

export const telegram_settings_step_login = /** @type {(inputs: Telegram_Settings_Step_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1. 登录 Telegram`)
};

export const telegram_settings_login = /** @type {(inputs: Telegram_Settings_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Telegram 登录`)
};

export const telegram_settings_logging_in = /** @type {(inputs: Telegram_Settings_Logging_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录中...`)
};

export const telegram_settings_integration_disabled = /** @type {(inputs: Telegram_Settings_Integration_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前环境未启用 Telegram 集成。`)
};

export const telegram_settings_verifying_login = /** @type {(inputs: Telegram_Settings_Verifying_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在验证登录...`)
};

export const telegram_settings_logged_in_as_name = /** @type {(inputs: Telegram_Settings_Logged_In_As_NameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已登录：${i?.name}`)
};

export const telegram_settings_logged_in_as_username = /** @type {(inputs: Telegram_Settings_Logged_In_As_UsernameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已登录：${i?.name} (@${i?.username})`)
};

export const telegram_settings_step_add_bot = /** @type {(inputs: Telegram_Settings_Step_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. 添加 bot 到社区`)
};

export const telegram_settings_add_bot_button = /** @type {(inputs: Telegram_Settings_Add_Bot_ButtonInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`添加 @${i?.username}`)
};

export const telegram_settings_step_sync_communities = /** @type {(inputs: Telegram_Settings_Step_Sync_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. 同步社区列表`)
};

export const telegram_settings_refresh_communities = /** @type {(inputs: Telegram_Settings_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刷新社区列表`)
};

export const event_settings_title = /** @type {(inputs: Event_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件配置`)
};

export const event_settings_select_company_first = /** @type {(inputs: Event_Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司。`)
};

export const event_settings_add_type = /** @type {(inputs: Event_Settings_Add_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增类型`)
};

export const event_settings_trigger_select_owner = /** @type {(inputs: Event_Settings_Trigger_Select_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先选负责人`)
};

export const event_settings_trigger_owner_unbound = /** @type {(inputs: Event_Settings_Trigger_Owner_UnboundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`负责人未绑定账号`)
};

export const event_settings_trigger_no_channels = /** @type {(inputs: Event_Settings_Trigger_No_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无可选频道`)
};

export const event_settings_trigger_select_channel = /** @type {(inputs: Event_Settings_Trigger_Select_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择平台频道`)
};

export const event_settings_back_to_list = /** @type {(inputs: Event_Settings_Back_To_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回类型列表`)
};

export const event_settings_detail_title_new = /** @type {(inputs: Event_Settings_Detail_Title_NewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增类型规则详情`)
};

export const event_settings_detail_title_existing = /** @type {(inputs: Event_Settings_Detail_Title_ExistingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 规则详情`)
};

export const event_settings_detail_title_default = /** @type {(inputs: Event_Settings_Detail_Title_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`规则详情`)
};

export const event_settings_type_not_found = /** @type {(inputs: Event_Settings_Type_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到该事件类型。`)
};

export const event_settings_label_type_key = /** @type {(inputs: Event_Settings_Label_Type_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型 Key`)
};

export const event_settings_label_type_name = /** @type {(inputs: Event_Settings_Label_Type_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型名称`)
};

export const event_settings_label_type_description = /** @type {(inputs: Event_Settings_Label_Type_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型描述`)
};

export const event_settings_label_responsible = /** @type {(inputs: Event_Settings_Label_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`负责人（多选）`)
};

export const event_settings_select_responsible = /** @type {(inputs: Event_Settings_Select_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择负责人`)
};

export const event_settings_member_list_label = /** @type {(inputs: Event_Settings_Member_List_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组织成员（按邮箱）`)
};

export const event_settings_no_members = /** @type {(inputs: Event_Settings_No_MembersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无可选成员。`)
};

export const event_settings_bound_accounts = /** @type {(inputs: Event_Settings_Bound_AccountsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已绑定：${i?.accounts}`)
};

export const event_settings_unbound_accounts = /** @type {(inputs: Event_Settings_Unbound_AccountsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未绑定账号`)
};

export const event_settings_label_platform_channels = /** @type {(inputs: Event_Settings_Label_Platform_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台通知频道（多选）`)
};

export const event_settings_platform_channel_list = /** @type {(inputs: Event_Settings_Platform_Channel_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台频道列表`)
};

export const event_settings_no_channels = /** @type {(inputs: Event_Settings_No_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无可选频道。`)
};

export const event_settings_label_send_notification = /** @type {(inputs: Event_Settings_Label_Send_NotificationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送通知`)
};

export const event_settings_notify_disabled_hint = /** @type {(inputs: Event_Settings_Notify_Disabled_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭后，当前事件类型不会发送负责人通知。`)
};

export const event_settings_notification_targets = /** @type {(inputs: Event_Settings_Notification_TargetsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通知目标`)
};

export const event_settings_notification_targets_empty = /** @type {(inputs: Event_Settings_Notification_Targets_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无通知目标。`)
};

export const event_settings_list_title = /** @type {(inputs: Event_Settings_List_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件类型`)
};

export const event_settings_list_empty = /** @type {(inputs: Event_Settings_List_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前公司暂无事件类型。`)
};

export const event_settings_system_badge = /** @type {(inputs: Event_Settings_System_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`系统`)
};

export const event_settings_unnamed_type = /** @type {(inputs: Event_Settings_Unnamed_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名类型`)
};

export const event_type_label_exception_issue = /** @type {(inputs: Event_Type_Label_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常问题`)
};

export const event_type_label_usage_issue = /** @type {(inputs: Event_Type_Label_Usage_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用问题`)
};

export const event_type_label_order_issue = /** @type {(inputs: Event_Type_Label_Order_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`订单问题`)
};

export const event_type_label_business_cooperation = /** @type {(inputs: Event_Type_Label_Business_CooperationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`商务合作`)
};

export const event_type_label_product_feedback = /** @type {(inputs: Event_Type_Label_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`产品反馈`)
};

export const event_type_label_unrecognized_information = /** @type {(inputs: Event_Type_Label_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法识别信息`)
};

export const event_type_label_advertisement = /** @type {(inputs: Event_Type_Label_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`广告`)
};

export const event_type_label_message_deletion = /** @type {(inputs: Event_Type_Label_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息删除`)
};

export const event_settings_read_members_error = /** @type {(inputs: Event_Settings_Read_Members_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取组织成员失败。`)
};

export const event_settings_read_bindings_error = /** @type {(inputs: Event_Settings_Read_Bindings_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取成员绑定账号失败。`)
};

export const event_settings_read_type_config_error = /** @type {(inputs: Event_Settings_Read_Type_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 event_type_config 失败。`)
};

export const event_settings_read_notification_target_error = /** @type {(inputs: Event_Settings_Read_Notification_Target_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 event_notification_target 失败。`)
};

export const event_settings_invalid_type_key = /** @type {(inputs: Event_Settings_Invalid_Type_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型 Key 非法，请检查后重试。`)
};

export const event_settings_type_name_required = /** @type {(inputs: Event_Settings_Type_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型名称不能为空。`)
};

export const event_settings_missing_type_config_migration = /** @type {(inputs: Event_Settings_Missing_Type_Config_MigrationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库尚未完成 event_type_config 迁移，暂时无法保存类型配置。`)
};

export const event_settings_save_type_config_error = /** @type {(inputs: Event_Settings_Save_Type_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存事件类型配置失败。`)
};

export const event_settings_missing_saved_config_id = /** @type {(inputs: Event_Settings_Missing_Saved_Config_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存事件类型后未获取到有效配置 ID，请刷新重试。`)
};

export const event_settings_members_not_loaded = /** @type {(inputs: Event_Settings_Members_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`负责人目录尚未加载完成，请稍后重试保存。`)
};

export const event_settings_channels_not_loaded = /** @type {(inputs: Event_Settings_Channels_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道列表尚未加载完成，请刷新后重试。`)
};

export const event_settings_clear_targets_error = /** @type {(inputs: Event_Settings_Clear_Targets_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清理旧通知目标失败。`)
};

export const event_settings_write_target_error = /** @type {(inputs: Event_Settings_Write_Target_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`写入通知目标失败。`)
};

export const event_settings_saved = /** @type {(inputs: Event_Settings_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件类型配置已保存。`)
};

export const event_settings_save_error = /** @type {(inputs: Event_Settings_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存事件类型配置失败，请稍后重试。`)
};

export const event_settings_notify_off = /** @type {(inputs: Event_Settings_Notify_OffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不通知`)
};

export const event_settings_notify_on = /** @type {(inputs: Event_Settings_Notify_OnInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通知`)
};

export const integration_status_not_connected = /** @type {(inputs: Integration_Status_Not_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未连接`)
};

export const integration_status_degraded_retry = /** @type {(inputs: Integration_Status_Degraded_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`降级（可重试）`)
};

export const integration_status_connected = /** @type {(inputs: Integration_Status_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已连接`)
};

export const integration_status_disabled = /** @type {(inputs: Integration_Status_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已禁用`)
};

export const integration_sync_success = /** @type {(inputs: Integration_Sync_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动同步成功。`)
};

export const integration_sync_success_channels_roles = /** @type {(inputs: Integration_Sync_Success_Channels_RolesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`手动同步成功：channels ${i?.channels} 条，roles ${i?.roles} 条。`)
};

export const integration_sync_success_channels = /** @type {(inputs: Integration_Sync_Success_ChannelsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`手动同步成功：channels ${i?.channels} 条。`)
};

export const integration_connected_backfill_success = /** @type {(inputs: Integration_Connected_Backfill_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 已连接并完成首次回填。`)
};

export const integration_connected_backfill_degraded = /** @type {(inputs: Integration_Connected_Backfill_DegradedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 已连接，但首次回填失败，可点击“手动同步”重试。`)
};

export const integration_create_install_error = /** @type {(inputs: Integration_Create_Install_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`创建 ${i?.platform} 安装链接失败。`)
};

export const integration_manual_sync_error = /** @type {(inputs: Integration_Manual_Sync_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动同步失败。`)
};

export const integration_owner_admin_only = /** @type {(inputs: Integration_Owner_Admin_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可操作。`)
};

export const integration_add_community = /** @type {(inputs: Integration_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加社区`)
};

export const integration_empty_with_company = /** @type {(inputs: Integration_Empty_With_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无社区，点击右上角添加社区。`)
};

export const integration_empty_without_company = /** @type {(inputs: Integration_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司后再添加社区。`)
};

export const integration_dialog_title = /** @type {(inputs: Integration_Dialog_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`添加 ${i?.platform} 社区`)
};

export const integration_step_connect = /** @type {(inputs: Integration_Step_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`1. 连接 ${i?.platform}`)
};

export const integration_step_sync = /** @type {(inputs: Integration_Step_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. 同步社区`)
};

export const integration_step_refresh = /** @type {(inputs: Integration_Step_RefreshInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. 刷新社区列表`)
};

export const integration_creating_install_link = /** @type {(inputs: Integration_Creating_Install_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在创建安装链接...`)
};

export const integration_reconnect = /** @type {(inputs: Integration_ReconnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`重新连接 ${i?.platform}`)
};

export const integration_connect = /** @type {(inputs: Integration_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`连接 ${i?.platform}`)
};

export const integration_syncing = /** @type {(inputs: Integration_SyncingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`同步中...`)
};

export const integration_manual_sync = /** @type {(inputs: Integration_Manual_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动同步`)
};

export const integration_refresh_communities = /** @type {(inputs: Integration_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刷新社区列表`)
};

export const discord_channel_text = /** @type {(inputs: Discord_Channel_TextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文本`)
};

export const discord_channel_voice = /** @type {(inputs: Discord_Channel_VoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语音`)
};

export const discord_channel_category = /** @type {(inputs: Discord_Channel_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分类`)
};

export const discord_channel_announcement = /** @type {(inputs: Discord_Channel_AnnouncementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公告`)
};

export const discord_channel_stage = /** @type {(inputs: Discord_Channel_StageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stage`)
};

export const discord_channel_forum = /** @type {(inputs: Discord_Channel_ForumInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`论坛`)
};

export const discord_channel_default = /** @type {(inputs: Discord_Channel_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道`)
};

export const slack_channel_private = /** @type {(inputs: Slack_Channel_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私有频道`)
};

export const slack_channel_public = /** @type {(inputs: Slack_Channel_PublicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开频道`)
};

export const slack_channel_direct_message = /** @type {(inputs: Slack_Channel_Direct_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私聊`)
};

export const slack_channel_multi_person_dm = /** @type {(inputs: Slack_Channel_Multi_Person_DmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`多人私聊`)
};

export const slack_channel_group = /** @type {(inputs: Slack_Channel_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`群组`)
};

export const slack_channel_default = /** @type {(inputs: Slack_Channel_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`频道`)
};

export const settings_remove_member_error = /** @type {(inputs: Settings_Remove_Member_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除成员失败，请稍后重试。`)
};

export const knowledge_upload_completed = /** @type {(inputs: Knowledge_Upload_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 上传并处理完成`)
};

export const knowledge_web_crawl_completed = /** @type {(inputs: Knowledge_Web_Crawl_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`网页知识抓取完成：${i?.url}`)
};

export const knowledge_close_result_panel = /** @type {(inputs: Knowledge_Close_Result_PanelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭结果面板`)
};

export const knowledge_close_detail_popup = /** @type {(inputs: Knowledge_Close_Detail_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭详情弹窗`)
};

export const knowledge_close_document_popup = /** @type {(inputs: Knowledge_Close_Document_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭文档弹窗`)
};

export const knowledge_chunk_list = /** @type {(inputs: Knowledge_Chunk_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识列表`)
};

export const knowledge_close_image_preview = /** @type {(inputs: Knowledge_Close_Image_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭图片预览`)
};

export const knowledge_delete_confirm_action = /** @type {(inputs: Knowledge_Delete_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认删除`)
};

export const knowledge_delete_confirm_desc_prefix = /** @type {(inputs: Knowledge_Delete_Confirm_Desc_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除后不可恢复：`)
};

export const knowledge_delete_confirm_title = /** @type {(inputs: Knowledge_Delete_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认删除知识？`)
};

export const knowledge_delete_failed = /** @type {(inputs: Knowledge_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除失败`)
};

export const knowledge_deleting = /** @type {(inputs: Knowledge_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除中...`)
};

export const knowledge_doc_insight_title = /** @type {(inputs: Knowledge_Doc_Insight_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档洞察`)
};

export const knowledge_doc_title = /** @type {(inputs: Knowledge_Doc_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标题`)
};

export const knowledge_generated_count = /** @type {(inputs: Knowledge_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成数量`)
};

export const knowledge_image_attachments = /** @type {(inputs: Knowledge_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`图片附件`)
};

export const knowledge_image_preview_hint = /** @type {(inputs: Knowledge_Image_Preview_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击缩略图可预览大图`)
};

export const knowledge_load_attachments_failed = /** @type {(inputs: Knowledge_Load_Attachments_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载附件失败`)
};

export const knowledge_load_chunks_failed = /** @type {(inputs: Knowledge_Load_Chunks_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载知识失败`)
};

export const knowledge_manual_knowledge_prefix = /** @type {(inputs: Knowledge_Manual_Knowledge_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动知识`)
};

export const knowledge_no_chunk_data = /** @type {(inputs: Knowledge_No_Chunk_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前文档没有知识数据`)
};

export const knowledge_no_image_attachments = /** @type {(inputs: Knowledge_No_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个文档没有可预览的图片附件`)
};

export const knowledge_no_source_document_url = /** @type {(inputs: Knowledge_No_Source_Document_UrlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到可查看的文档地址`)
};

export const knowledge_preview = /** @type {(inputs: Knowledge_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览`)
};

export const knowledge_role_assistant = /** @type {(inputs: Knowledge_Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`助手`)
};

export const knowledge_role_user = /** @type {(inputs: Knowledge_Role_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户`)
};

export const knowledge_search_placeholder = /** @type {(inputs: Knowledge_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索知识`)
};

export const knowledge_session_not_found = /** @type {(inputs: Knowledge_Session_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未查询到该会话消息`)
};

export const knowledge_source_filter = /** @type {(inputs: Knowledge_Source_FilterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来源`)
};

export const knowledge_source_manual = /** @type {(inputs: Knowledge_Source_ManualInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动添加`)
};

export const knowledge_source_official_doc = /** @type {(inputs: Knowledge_Source_Official_DocInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`官方文档`)
};

export const knowledge_source_web_crawl = /** @type {(inputs: Knowledge_Source_Web_CrawlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`网页抓取`)
};

export const knowledge_source_session_record = /** @type {(inputs: Knowledge_Source_Session_RecordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话记录`)
};

export const knowledge_source_title = /** @type {(inputs: Knowledge_Source_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识来源`)
};

export const knowledge_upload_crawl_hint = /** @type {(inputs: Knowledge_Upload_Crawl_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`爬虫将从该 URL 开始抓取，并将内容送入知识处理管线。`)
};

export const knowledge_upload_crawl_max_depth_label = /** @type {(inputs: Knowledge_Upload_Crawl_Max_Depth_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最大抓取深度`)
};

export const knowledge_upload_crawl_max_pages_label = /** @type {(inputs: Knowledge_Upload_Crawl_Max_Pages_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最大抓取页数`)
};

export const knowledge_upload_crawl_tab = /** @type {(inputs: Knowledge_Upload_Crawl_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`网页抓取`)
};

export const knowledge_upload_crawl_url_label = /** @type {(inputs: Knowledge_Upload_Crawl_Url_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`抓取入口 URL`)
};

export const knowledge_upload_crawl_url_placeholder = /** @type {(inputs: Knowledge_Upload_Crawl_Url_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`例如 https://docs.example.com`)
};

export const knowledge_upload_crawl_url_required = /** @type {(inputs: Knowledge_Upload_Crawl_Url_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入有效的 URL（http/https）`)
};

export const knowledge_tab_docs = /** @type {(inputs: Knowledge_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

export const knowledge_tab_items = /** @type {(inputs: Knowledge_Tab_ItemsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有知识`)
};

export const knowledge_total_count_prefix = /** @type {(inputs: Knowledge_Total_Count_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总计`)
};

export const knowledge_total_count_suffix = /** @type {(inputs: Knowledge_Total_Count_SuffixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`条`)
};

export const knowledge_total_prefix = /** @type {(inputs: Knowledge_Total_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总数`)
};

export const knowledge_type_size = /** @type {(inputs: Knowledge_Type_SizeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型/大小`)
};

export const knowledge_upload_dialog_title = /** @type {(inputs: Knowledge_Upload_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传知识`)
};

export const knowledge_upload_doc_click = /** @type {(inputs: Knowledge_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击上传`)
};

export const knowledge_upload_doc_drag_hint = /** @type {(inputs: Knowledge_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`或拖拽文件到此处`)
};

export const knowledge_upload_doc_format_hint = /** @type {(inputs: Knowledge_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支持 PDF / DOC / DOCX / MD`)
};

export const knowledge_upload_doc_tab = /** @type {(inputs: Knowledge_Upload_Doc_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传文档`)
};

export const knowledge_upload_knowledge = /** @type {(inputs: Knowledge_Upload_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传知识`)
};

export const knowledge_upload_manual_tab = /** @type {(inputs: Knowledge_Upload_Manual_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动添加`)
};

export const knowledge_upload_selected_files_title = /** @type {(inputs: Knowledge_Upload_Selected_Files_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已选文件`)
};

export const knowledge_upload_selected_prefix = /** @type {(inputs: Knowledge_Upload_Selected_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已选择：`)
};

export const knowledge_upload_submit = /** @type {(inputs: Knowledge_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认上传`)
};

export const knowledge_uploader = /** @type {(inputs: Knowledge_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传人`)
};

export const knowledge_uploaded_at = /** @type {(inputs: Knowledge_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传时间`)
};

export const knowledge_uploading = /** @type {(inputs: Knowledge_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`处理中...`)
};

export const knowledge_view_document = /** @type {(inputs: Knowledge_View_DocumentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看文档`)
};

export const knowledge_view_source = /** @type {(inputs: Knowledge_View_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看来源`)
};

export const session_unknown_channel = /** @type {(inputs: Session_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知频道`)
};

export const app_logo_alt = /** @type {(inputs: App_Logo_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius 标识`)
};

export const onboarding_company_website_placeholder = /** @type {(inputs: Onboarding_Company_Website_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`https://example.com`)
};

export const member_management_email_placeholder = /** @type {(inputs: Member_Management_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`member@example.com`)
};

export const service_login_required = /** @type {(inputs: Service_Login_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前用户未登录，请重新登录后再操作。`)
};

export const service_company_update_permission_denied = /** @type {(inputs: Service_Company_Update_Permission_DeniedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号暂无修改公司信息权限，请联系工作区管理员。`)
};

export const service_company_not_found = /** @type {(inputs: Service_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到当前公司信息，请刷新后重试。`)
};

export const service_company_name_required = /** @type {(inputs: Service_Company_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入公司名称。`)
};

export const service_workspace_create_failed = /** @type {(inputs: Service_Workspace_Create_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建工作区失败，请稍后重试。`)
};

export const service_workspace_create_missing_company_id = /** @type {(inputs: Service_Workspace_Create_Missing_Company_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建工作区成功，但未获取到公司 ID。`)
};

export const service_avatar_public_url_missing = /** @type {(inputs: Service_Avatar_Public_Url_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`头像上传成功，但未获取到可访问地址。`)
};

export const service_profile_name_conflict = /** @type {(inputs: Service_Profile_Name_ConflictInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该昵称在当前工作区已被使用，请更换一个昵称。`)
};

export const service_profile_member_inactive = /** @type {(inputs: Service_Profile_Member_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你不是当前公司的有效成员，或邀请尚未完成生效。请重新登录后重试。`)
};

export const service_discord_request_failed = /** @type {(inputs: Service_Discord_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discord 集成请求失败。`)
};

export const service_slack_request_failed = /** @type {(inputs: Service_Slack_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack 集成请求失败。`)
};

export const service_telegram_request_failed = /** @type {(inputs: Service_Telegram_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram 集成请求失败。`)
};

export const service_feishu_channels_read_failed = /** @type {(inputs: Service_Feishu_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取飞书频道失败。`)
};

export const service_member_management_request_failed = /** @type {(inputs: Service_Member_Management_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员管理请求失败，请稍后重试。`)
};

export const service_member_activity_report_failed = /** @type {(inputs: Service_Member_Activity_Report_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员活跃时间上报失败，请稍后重试。`)
};

export const service_event_action_request_failed = /** @type {(inputs: Service_Event_Action_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件操作失败，请稍后重试。`)
};

export const service_billing_request_failed = /** @type {(inputs: Service_Billing_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing 请求失败，请稍后重试。`)
};

export const service_client_chat_request_failed = /** @type {(inputs: Service_Client_Chat_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`客户端聊天请求失败，请稍后重试。`)
};

export const service_workgroup_table_missing = /** @type {(inputs: Service_Workgroup_Table_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置表尚未创建，请先执行最新数据库迁移。`)
};

export const service_workgroup_fetch_failed = /** @type {(inputs: Service_Workgroup_Fetch_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取工作群设置失败。`)
};

export const service_workgroup_save_failed = /** @type {(inputs: Service_Workgroup_Save_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存工作群设置失败。`)
};

export const service_workgroup_save_incomplete = /** @type {(inputs: Service_Workgroup_Save_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置保存成功，但返回数据不完整。`)
};

export const service_workgroup_delete_failed = /** @type {(inputs: Service_Workgroup_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除工作群设置失败。`)
};

export const service_event_query_schema_not_exposed = /** @type {(inputs: Service_Event_Query_Schema_Not_ExposedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supabase API 尚未暴露 schema \`lucius_agent\`。请在 Supabase Dashboard -> Project Settings -> API -> Exposed schemas 中添加 \`lucius_agent\` 后重试。`)
};

export const service_event_query_schema_permission_denied = /** @type {(inputs: Service_Event_Query_Schema_Permission_DeniedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`当前账号没有 \`${i?.schemaName}\` schema 的访问权限。请在数据库端为浏览器角色授予 schema 使用权限和表读取权限，或通过服务端代理查询后再重试。`)
};

export const service_event_query_failed = /** @type {(inputs: Service_Event_Query_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件查询失败，请稍后重试。`)
};

export const service_event_detail_request_failed = /** @type {(inputs: Service_Event_Detail_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务详情请求失败，请稍后重试。`)
};

export const service_event_query_empty_content = /** @type {(inputs: Service_Event_Query_Empty_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`[无文本内容]`)
};

export const common_lucius_ai_name = /** @type {(inputs: Common_Lucius_Ai_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

export const workgroup_meta_supergroup = /** @type {(inputs: Workgroup_Meta_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超级群组`)
};

export const workgroup_channel_missing_from_platform = /** @type {(inputs: Workgroup_Channel_Missing_From_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前平台列表未返回该频道`)
};

export const workgroup_summary_selected = /** @type {(inputs: Workgroup_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已设置 ${i?.count} 个工作群`)
};

export const workgroup_summary_available = /** @type {(inputs: Workgroup_Summary_AvailableInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`可从 ${i?.count} 个频道中选择`)
};

export const workgroup_summary_saved_needs_connection = /** @type {(inputs: Workgroup_Summary_Saved_Needs_ConnectionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已保存 ${i?.count} 个工作群，当前平台需重新关联`)
};

export const workgroup_summary_unavailable = /** @type {(inputs: Workgroup_Summary_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂不可用`)
};

export const workgroup_summary_needs_connection = /** @type {(inputs: Workgroup_Summary_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`需先完成平台关联`)
};

export const workgroup_helper_connected_named = /** @type {(inputs: Workgroup_Helper_Connected_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已关联 ${i?.name}`)
};

export const workgroup_discord_ready = /** @type {(inputs: Workgroup_Discord_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已关联 Discord，可继续选择工作群。`)
};

export const workgroup_discord_connect_first = /** @type {(inputs: Workgroup_Discord_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先在 Discord 设置中完成社区关联，再回来选择工作群。`)
};

export const workgroup_discord_channels_read_failed = /** @type {(inputs: Workgroup_Discord_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Discord 频道失败。`)
};

export const workgroup_discord_status_read_failed = /** @type {(inputs: Workgroup_Discord_Status_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Discord 关联状态失败。`)
};

export const workgroup_slack_ready = /** @type {(inputs: Workgroup_Slack_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已关联 Slack，可继续选择工作群。`)
};

export const workgroup_slack_connect_first = /** @type {(inputs: Workgroup_Slack_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先在 Slack 设置中完成工作区关联，再回来选择工作群。`)
};

export const workgroup_slack_channels_read_failed = /** @type {(inputs: Workgroup_Slack_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Slack 频道失败。`)
};

export const workgroup_slack_status_read_failed = /** @type {(inputs: Workgroup_Slack_Status_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Slack 关联状态失败。`)
};

export const workgroup_telegram_ready = /** @type {(inputs: Workgroup_Telegram_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已绑定 ${i?.count} 个 Telegram 社区，可继续选择工作群。`)
};

export const workgroup_telegram_connect_first = /** @type {(inputs: Workgroup_Telegram_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先在 Telegram 设置中添加社区，再回来选择工作群。`)
};

export const workgroup_telegram_channels_read_failed = /** @type {(inputs: Workgroup_Telegram_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Telegram 社区失败。`)
};

export const workgroup_feishu_ready = /** @type {(inputs: Workgroup_Feishu_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已同步 ${i?.count} 个飞书群，可继续选择工作群。`)
};

export const workgroup_feishu_connect_first = /** @type {(inputs: Workgroup_Feishu_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先完成飞书工作群接入，再回来选择工作群。`)
};

export const workgroup_feishu_channels_read_failed = /** @type {(inputs: Workgroup_Feishu_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取飞书频道失败。`)
};

export const knowledge_session_load_failed = /** @type {(inputs: Knowledge_Session_Load_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`会话加载失败：${i?.status}`)
};

export const billing_plan_name_free = /** @type {(inputs: Billing_Plan_Name_FreeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`免费版`)
};

export const billing_plan_name_basic = /** @type {(inputs: Billing_Plan_Name_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic`)
};

export const billing_plan_name_pro = /** @type {(inputs: Billing_Plan_Name_ProInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro`)
};

export const billing_export_base_plan_label = /** @type {(inputs: Billing_Export_Base_Plan_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基础套餐`)
};

export const billing_export_base_plan_description = /** @type {(inputs: Billing_Export_Base_Plan_DescriptionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.planName} 月费`)
};

export const billing_export_base_plan_quantity = /** @type {(inputs: Billing_Export_Base_Plan_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 套`)
};

export const billing_export_included_actions_label = /** @type {(inputs: Billing_Export_Included_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`included actions`)
};

export const billing_export_included_actions_desc = /** @type {(inputs: Billing_Export_Included_Actions_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期套餐内含额度`)
};

export const billing_export_used_actions_label = /** @type {(inputs: Billing_Export_Used_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本期已用 actions`)
};

export const billing_export_used_actions_desc_over = /** @type {(inputs: Billing_Export_Used_Actions_Desc_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已超出 included 配额`)
};

export const billing_export_used_actions_desc_included = /** @type {(inputs: Billing_Export_Used_Actions_Desc_IncludedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前仍在 included 配额范围内`)
};

export const billing_export_extra_admins_label = /** @type {(inputs: Billing_Export_Extra_Admins_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`额外管理员席位`)
};

export const billing_export_extra_admins_desc = /** @type {(inputs: Billing_Export_Extra_Admins_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超出套餐 included 管理员数`)
};

export const billing_export_extra_platforms_label = /** @type {(inputs: Billing_Export_Extra_Platforms_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`额外接入平台`)
};

export const billing_export_extra_platforms_desc = /** @type {(inputs: Billing_Export_Extra_Platforms_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超出套餐 included 平台数`)
};

export const billing_export_overage_actions_label = /** @type {(inputs: Billing_Export_Overage_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额 actions`)
};

export const billing_export_overage_actions_desc = /** @type {(inputs: Billing_Export_Overage_Actions_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`按 ${i?.mode} 规则计费`)
};

export const billing_export_blocked_actions_label = /** @type {(inputs: Billing_Export_Blocked_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`被拦截 actions`)
};

export const billing_export_blocked_actions_desc_stop = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_StopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已被达量停服策略拦截，不计费`)
};

export const billing_export_blocked_actions_desc_cap = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期被额度策略拦截`)
};

export const billing_export_quantity_actions = /** @type {(inputs: Billing_Export_Quantity_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} actions`)
};

export const billing_export_quantity_admins = /** @type {(inputs: Billing_Export_Quantity_AdminsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 位`)
};

export const billing_export_quantity_platforms = /** @type {(inputs: Billing_Export_Quantity_PlatformsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个`)
};

export const billing_export_csv_account_id = /** @type {(inputs: Billing_Export_Csv_Account_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账单账号 ID`)
};

export const billing_export_csv_period_key = /** @type {(inputs: Billing_Export_Csv_Period_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期 key`)
};

export const billing_export_csv_period_start = /** @type {(inputs: Billing_Export_Csv_Period_StartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期开始`)
};

export const billing_export_csv_period_end = /** @type {(inputs: Billing_Export_Csv_Period_EndInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期结束`)
};

export const billing_export_csv_plan = /** @type {(inputs: Billing_Export_Csv_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套餐`)
};

export const billing_export_csv_overage_policy = /** @type {(inputs: Billing_Export_Csv_Overage_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额策略`)
};

export const billing_export_csv_projected_total = /** @type {(inputs: Billing_Export_Csv_Projected_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预计账单 (USD)`)
};

export const billing_export_csv_category = /** @type {(inputs: Billing_Export_Csv_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分类`)
};

export const billing_export_csv_description = /** @type {(inputs: Billing_Export_Csv_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`描述`)
};

export const billing_export_csv_charge = /** @type {(inputs: Billing_Export_Csv_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收费项`)
};

export const billing_export_csv_info = /** @type {(inputs: Billing_Export_Csv_InfoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`信息项`)
};

export const billing_export_csv_estimated_total = /** @type {(inputs: Billing_Export_Csv_Estimated_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预计结算总计`)
};

export const cp_page_title = /** @type {(inputs: Cp_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区画像`)
};

export const cp_filter_community = /** @type {(inputs: Cp_Filter_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区`)
};

export const cp_filter_time = /** @type {(inputs: Cp_Filter_TimeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`时间`)
};

export const cp_all_communities = /** @type {(inputs: Cp_All_CommunitiesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`现有社区 (${i?.count})`)
};

export const cp_time_7d = /** @type {(inputs: Cp_Time_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7 天内`)
};

export const cp_time_14d = /** @type {(inputs: Cp_Time_14dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`14 天内`)
};

export const cp_time_30d = /** @type {(inputs: Cp_Time_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30 天内`)
};

export const cp_section_metrics = /** @type {(inputs: Cp_Section_MetricsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`核心指标卡`)
};

export const cp_total_users = /** @type {(inputs: Cp_Total_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区总人数`)
};

export const cp_total_users_helper = /** @type {(inputs: Cp_Total_Users_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`截至当前总规模`)
};

export const cp_new_users = /** @type {(inputs: Cp_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区新增用户`)
};

export const cp_new_users_helper = /** @type {(inputs: Cp_New_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.range} 内累计新增`)
};

export const cp_active_users = /** @type {(inputs: Cp_Active_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区活跃用户`)
};

export const cp_active_users_helper = /** @type {(inputs: Cp_Active_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.range} 内活跃表现`)
};

export const cp_section_trends = /** @type {(inputs: Cp_Section_TrendsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`趋势洞察`)
};

export const cp_chart_total_users = /** @type {(inputs: Cp_Chart_Total_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区总人数走势`)
};

export const cp_chart_new_users = /** @type {(inputs: Cp_Chart_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增用户走势`)
};

export const cp_chart_active_users = /** @type {(inputs: Cp_Chart_Active_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`活跃用户走势`)
};

export const cp_no_chart_data = /** @type {(inputs: Cp_No_Chart_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前时间范围内暂无可视化数据`)
};

export const ul_page_title = /** @type {(inputs: Ul_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户列表`)
};

export const ul_no_data = /** @type {(inputs: Ul_No_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无`)
};

export const ul_platform_all = /** @type {(inputs: Ul_Platform_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部平台`)
};

export const ul_active_all = /** @type {(inputs: Ul_Active_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部活跃周期`)
};

export const ul_active_7d = /** @type {(inputs: Ul_Active_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`近 7 天活跃`)
};

export const ul_active_30d = /** @type {(inputs: Ul_Active_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`近 30 天活跃`)
};

export const ul_active_90d = /** @type {(inputs: Ul_Active_90dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`近 90 天活跃`)
};

export const ul_sort_last_active = /** @type {(inputs: Ul_Sort_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近活跃`)
};

export const ul_sort_total_messages = /** @type {(inputs: Ul_Sort_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总消息数`)
};

export const ul_sort_last_summary = /** @type {(inputs: Ul_Sort_Last_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近总结`)
};

export const ul_sort_last_updated = /** @type {(inputs: Ul_Sort_Last_UpdatedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近更新`)
};

export const ul_sort_created_at = /** @type {(inputs: Ul_Sort_Created_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建时间`)
};

export const ul_sort_username = /** @type {(inputs: Ul_Sort_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户名`)
};

export const ul_order_desc = /** @type {(inputs: Ul_Order_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`降序`)
};

export const ul_order_asc = /** @type {(inputs: Ul_Order_AscInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`升序`)
};

export const ul_search_placeholder = /** @type {(inputs: Ul_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索 user_id / 用户名 / 用户画像`)
};

export const ul_clear_filters = /** @type {(inputs: Ul_Clear_FiltersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清空筛选`)
};

export const ul_total_users = /** @type {(inputs: Ul_Total_UsersInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`共 ${i?.count} 位用户`)
};

export const ul_showing_range = /** @type {(inputs: Ul_Showing_RangeInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`当前显示 ${i?.start}-${i?.end}`)
};

export const ul_updating = /** @type {(inputs: Ul_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新中`)
};

export const ul_pick_company_first = /** @type {(inputs: Ul_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司后再查看用户列表。`)
};

export const ul_load_error = /** @type {(inputs: Ul_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载用户列表失败`)
};

export const ul_col_user = /** @type {(inputs: Ul_Col_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户`)
};

export const ul_col_platform = /** @type {(inputs: Ul_Col_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台`)
};

export const ul_col_total_messages = /** @type {(inputs: Ul_Col_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总消息数`)
};

export const ul_col_first_interaction = /** @type {(inputs: Ul_Col_First_InteractionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`首次互动`)
};

export const ul_col_last_active = /** @type {(inputs: Ul_Col_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最后活跃`)
};

export const ul_col_profile = /** @type {(inputs: Ul_Col_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户画像`)
};

export const ul_col_tags = /** @type {(inputs: Ul_Col_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签`)
};

export const ul_all_tags = /** @type {(inputs: Ul_All_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部标签`)
};

export const ul_no_tags = /** @type {(inputs: Ul_No_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无标签`)
};

export const ul_min_messages = /** @type {(inputs: Ul_Min_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最少消息数`)
};

export const ul_sort_field = /** @type {(inputs: Ul_Sort_FieldInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`排序字段`)
};

export const ul_sort_order = /** @type {(inputs: Ul_Sort_OrderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`顺序`)
};

export const ul_no_profile = /** @type {(inputs: Ul_No_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`尚未补充用户画像`)
};

export const ul_empty_results = /** @type {(inputs: Ul_Empty_ResultsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前筛选条件下暂无用户结果。`)
};

export const ul_detail_title = /** @type {(inputs: Ul_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户档案`)
};

export const ul_close_detail = /** @type {(inputs: Ul_Close_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭用户详情`)
};

export const ul_detail_first_interaction = /** @type {(inputs: Ul_Detail_First_InteractionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`首次互动`)
};

export const ul_detail_first_interaction_helper = /** @type {(inputs: Ul_Detail_First_Interaction_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户第一次被系统记录到的互动日期`)
};

export const ul_detail_last_active = /** @type {(inputs: Ul_Detail_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最后活跃`)
};

export const ul_detail_last_active_helper = /** @type {(inputs: Ul_Detail_Last_Active_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最后一次产生消息的日期`)
};

export const ul_detail_profile = /** @type {(inputs: Ul_Detail_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户画像`)
};

export const ul_detail_profile_expand = /** @type {(inputs: Ul_Detail_Profile_ExpandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`展开`)
};

export const ul_detail_profile_collapse = /** @type {(inputs: Ul_Detail_Profile_CollapseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收起`)
};

export const ul_detail_tags = /** @type {(inputs: Ul_Detail_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签说明`)
};

export const ul_detail_no_reason = /** @type {(inputs: Ul_Detail_No_ReasonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无命中原因`)
};

export const ul_trend_messages_title = /** @type {(inputs: Ul_Trend_Messages_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30 天消息趋势`)
};

export const ul_trend_messages_desc = /** @type {(inputs: Ul_Trend_Messages_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基于 m30_message_counts 数组生成`)
};

export const ul_trend_active_title = /** @type {(inputs: Ul_Trend_Active_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30 天活跃分数`)
};

export const ul_trend_active_desc = /** @type {(inputs: Ul_Trend_Active_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基于 active_score 数组生成`)
};

export const ul_chat_records = /** @type {(inputs: Ul_Chat_RecordsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`聊天记录`)
};

export const ul_loading_messages = /** @type {(inputs: Ul_Loading_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载消息中`)
};

export const ul_load_messages_error = /** @type {(inputs: Ul_Load_Messages_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载消息失败`)
};

export const ul_no_messages = /** @type {(inputs: Ul_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无聊天记录`)
};

export const ul_empty_message = /** @type {(inputs: Ul_Empty_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息内容为空`)
};

export const ul_channel = /** @type {(inputs: Ul_ChannelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`频道 ${i?.channelId}`)
};

export const ul_total_messages_count = /** @type {(inputs: Ul_Total_Messages_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`累计 ${i?.count} 条消息`)
};

export const ul_loading_detail = /** @type {(inputs: Ul_Loading_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载用户详情`)
};

export const ul_loading_detail_desc = /** @type {(inputs: Ul_Loading_Detail_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请稍候，正在读取用户档案与消息记录。`)
};

export const ul_detail_load_error = /** @type {(inputs: Ul_Detail_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户详情加载失败`)
};

export const ul_retry_later = /** @type {(inputs: Ul_Retry_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请稍后重试`)
};

export const ul_tag_manage_button = /** @type {(inputs: Ul_Tag_Manage_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签管理`)
};

export const ul_tag_manage_title = /** @type {(inputs: Ul_Tag_Manage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签管理`)
};

export const ul_tag_manage_desc = /** @type {(inputs: Ul_Tag_Manage_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看现有标签，并为当前公司创建或停用标签定义。`)
};

export const ul_tag_existing = /** @type {(inputs: Ul_Tag_ExistingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`现有标签`)
};

export const ul_tag_count = /** @type {(inputs: Ul_Tag_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个标签`)
};

export const ul_tag_loading = /** @type {(inputs: Ul_Tag_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载标签中`)
};

export const ul_tag_load_error = /** @type {(inputs: Ul_Tag_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载标签失败`)
};

export const ul_tag_empty = /** @type {(inputs: Ul_Tag_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无标签`)
};

export const ul_tag_status_active = /** @type {(inputs: Ul_Tag_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用中`)
};

export const ul_tag_status_inactive = /** @type {(inputs: Ul_Tag_Status_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未启用`)
};

export const ul_tag_toggle_label = /** @type {(inputs: Ul_Tag_Toggle_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用状态`)
};

export const ul_tag_no_description = /** @type {(inputs: Ul_Tag_No_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无描述`)
};

export const ul_tag_create_title = /** @type {(inputs: Ul_Tag_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新建标签`)
};

export const ul_tag_create_desc = /** @type {(inputs: Ul_Tag_Create_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新建后会自动同步到用户列表页的标签筛选，默认立即启用。`)
};

export const ul_tag_form_name = /** @type {(inputs: Ul_Tag_Form_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签名`)
};

export const ul_tag_form_name_placeholder = /** @type {(inputs: Ul_Tag_Form_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`例如：高意向客户`)
};

export const ul_tag_form_name_required = /** @type {(inputs: Ul_Tag_Form_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入标签名`)
};

export const ul_tag_form_description = /** @type {(inputs: Ul_Tag_Form_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`描述`)
};

export const ul_tag_form_description_placeholder = /** @type {(inputs: Ul_Tag_Form_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`说明这个标签的判断标准或运营用途`)
};

export const ul_tag_create_button = /** @type {(inputs: Ul_Tag_Create_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建标签`)
};

export const ul_tag_create_loading = /** @type {(inputs: Ul_Tag_Create_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建中...`)
};

export const ul_tag_create_success = /** @type {(inputs: Ul_Tag_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签已创建`)
};

export const ul_tag_create_error = /** @type {(inputs: Ul_Tag_Create_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建标签失败`)
};

export const ul_tag_update_error = /** @type {(inputs: Ul_Tag_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新标签失败`)
};

export const ul_tag_enable_success = /** @type {(inputs: Ul_Tag_Enable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签已启用`)
};

export const ul_tag_disable_success = /** @type {(inputs: Ul_Tag_Disable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签已停用`)
};

export const ul_tag_init_button = /** @type {(inputs: Ul_Tag_Init_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化默认标签`)
};

export const ul_tag_init_loading = /** @type {(inputs: Ul_Tag_Init_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化中...`)
};

export const ul_tag_init_success = /** @type {(inputs: Ul_Tag_Init_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认标签已同步`)
};

export const ul_tag_init_error = /** @type {(inputs: Ul_Tag_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化默认标签失败`)
};