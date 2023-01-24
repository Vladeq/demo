import { CognitoUser } from 'amazon-cognito-identity-js';
import React, { FC } from 'react';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { AppText } from 'shared/ui';

import { useVerifyCodeForm } from '../../models';
import { ResendTimer } from './components';
import styles from './verify-code-form.styles';

type VerifyCodeFormProps = {
  cellCount: number;
  phone: string;
  cognitoUser: CognitoUser | null;
};

const VerifyCodeForm: FC<VerifyCodeFormProps> = ({ cellCount, phone, cognitoUser }) => {
  const { value, onChange, errors, isSubmitting } = useVerifyCodeForm(cellCount, cognitoUser);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });

  return (
    <>
      <CodeField
        {...props}
        caretHidden={false}
        value={value}
        onChangeText={onChange}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        autoFocus
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <AppText
            key={index}
            style={[styles.cell, errors.code && styles.errorCell, !symbol && isFocused && styles.cursor]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </AppText>
        )}
      />

      <AppText style={styles.error}>{errors.code?.message || ' '}</AppText>

      <ResendTimer isSubmitting={isSubmitting} phone={phone} />
    </>
  );
};

export default VerifyCodeForm;
