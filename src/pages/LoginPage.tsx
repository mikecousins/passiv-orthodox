import { Formik, Form, Field } from 'formik';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { passwordLogin } = useAuth();
  
  return (
    <div>
      Login
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => passwordLogin(values.email, values.password)}
      >
        {() => (
          <Form>
            <Field name="email" />
            <Field name="password" type="password" />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;