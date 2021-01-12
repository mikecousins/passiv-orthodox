import { Formik, Form, Field } from 'formik';
import { useAuth } from '../hooks/useAuth';

const TwoFactorPage = () => {
  const { tokenLogin } = useAuth();
  
  return (
    <div>
      Token
      <Formik
        initialValues={{
          token: '',
        }}
        onSubmit={(values) => tokenLogin(values.token)}
      >
        {() => (
          <Form>
            <Field name="token" placeholder="token" />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TwoFactorPage;