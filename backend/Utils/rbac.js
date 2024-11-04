export const permissions = [
    {
      role: 'admin',
      actions: [
        'canApproveFraudReport',
        'canDeleteFraudReport',
        'canSetApiKeyLimit',
        'canSetDomainRestrictions',
        'canDeactivateUserAccount',
        'canSetSystemConfig',
        'canManageAdmins'
      ]
    },
    {
      role: 'user',
      actions: [
        // Define user permissions here
      ]
    }
  ];
  