import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export const DocumentList = (): ReactElement => {
  const { t } = useTranslation(['common']);
	
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{t('common:dark_mode')}</div>;
};
