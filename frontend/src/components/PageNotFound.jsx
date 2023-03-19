import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
      <div className="inline-block align-middle">
        <h2 className="font-weight-normal lead">{t('pageNotFound.message')}</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
