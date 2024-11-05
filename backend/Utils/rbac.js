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
        'canManageAdmins',
        'canGetAdmins'
      ]
    },
  
    {
      role: 'user',
      actions: [
        // Define user permissions here
      ]
    }
  ];
