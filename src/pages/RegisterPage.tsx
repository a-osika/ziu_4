import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Breadcrumbs, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

import { fullSchema, RegistrationForm } from '../schemas/register.schema';
import { fakeRegister } from '../handlers/fakeRegister';
import RegisterStep1 from '../components/registration/RegisterStep1';
import RegisterStep2 from '../components/registration/RegisterStep2';
import RegisterStep3 from '../components/registration/RegisterStep3';
import { mapApiError } from '../services/formErrorMapper';
import { isApiError } from '../services/apiErrors';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      categories: [{ value: '' }],
      notifications: {
        email: false,
        push: false,
      },
      newsletter: false,
      rodo: false,
    },
    mode: 'onTouched',
  });

  const nextStep = async () => {
    let valid = false;

    if (step === 1) {
      valid = await form.trigger(['firstName', 'lastName', 'email', 'password', 'confirmPassword']);
    }

    if (step === 2) {
      valid = await form.trigger(['categories', 'notifications.email', 'notifications.push']);
    }

    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const cancelRegistration = () => {
    form.reset();
    navigate('/');
  };

  const onSubmit = async (data: RegistrationForm) => {
    try {
      await fakeRegister(data);

      login({
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
      });

      navigate('/');
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err: unknown) => {
    if (!isApiError(err)) return;

    mapApiError(err, form);

    if (err.field === 'email') setStep(1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <nav aria-label='Postęp rejestracji'>
        <Breadcrumbs separator='›' aria-label='breadcrumb'>
          <Typography
            color={step === 1 ? 'textPrimary' : 'textSecondary'}
            aria-current={step === 1 ? 'step' : undefined}
          >
            Dane użytkownika
          </Typography>

          <Typography
            color={step === 2 ? 'textPrimary' : 'textSecondary'}
            aria-current={step === 2 ? 'step' : undefined}
          >
            Preferencje
          </Typography>

          <Typography
            color={step === 3 ? 'textPrimary' : 'textSecondary'}
            aria-current={step === 3 ? 'step' : undefined}
          >
            Podsumowanie
          </Typography>
        </Breadcrumbs>
      </nav>
      {step === 1 && <RegisterStep1 form={form} />}
      {step === 2 && <RegisterStep2 form={form} />}
      {step === 3 && <RegisterStep3 form={form} onSubmit={form.handleSubmit(onSubmit)} />}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {step === 1 && (
          <Button variant='outlined' onClick={cancelRegistration}>
            Anuluj
          </Button>
        )}

        {step > 1 && (
          <Button variant='outlined' onClick={prevStep}>
            Wstecz
          </Button>
        )}

        {step < 3 && (
          <Button variant='contained' onClick={nextStep}>
            Dalej
          </Button>
        )}
      </Box>
    </Box>
  );
}
