import { useClickOutside, useOptimisticMessageSend, useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FC, KeyboardEvent, useMemo, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { ChatButton, LightTextarea } from 'ui';

import { Paperclip } from '../../../../../public/svg/components';
import { DropdownMenu } from './components';

const MAX_MESSAGE_LENGTH = 700;

type ChatTextareaProps = {
  disabled?: boolean;
  scrollToInitialPosition?: () => void;
};

const ChatTextarea: FC<ChatTextareaProps> = ({ disabled, scrollToInitialPosition }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.chatTextarea' });

  const containerRef = useRef<HTMLDivElement>(null);
  const { toggle, close, isOpened } = useToggle();
  useClickOutside(containerRef, close);

  const form = useForm<ChatFormValues>();
  const { handleSubmit, control, setValue } = form;

  const { sendOptimisticMessage, sendOptimisticMediaMessage } = useOptimisticMessageSend();

  const onSubmit = async (values: ChatFormValues) => {
    setValue('message', '');

    await sendOptimisticMessage(values.message, scrollToInitialPosition);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]!;

    close();
    sendOptimisticMediaMessage(file, scrollToInitialPosition);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const TextareaButton = useMemo(
    () => (
      <button type="button" disabled={disabled} onClick={toggle}>
        <Paperclip />
      </button>
    ),
    [],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Root>
        <FieldContainer ref={containerRef}>
          <Controller
            control={control}
            name="message"
            rules={{ required: true }}
            render={({ field }) => (
              <StyledTextarea
                $isOpen={isOpened}
                placeholder={disabled ? t('disabledPlaceholder') : t('placeholder')}
                RightIconComponent={TextareaButton}
                maxLength={MAX_MESSAGE_LENGTH}
                onClick={close}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                {...field}
              />
            )}
          />
          <FormProvider {...form}>
            <DropdownMenu onChange={handleFileChange} isOpen={isOpened} closeMenu={close} />
          </FormProvider>
        </FieldContainer>
        <ChatButton disabled={disabled} type="submit" />
      </Root>
    </form>
  );
};

export default ChatTextarea;

export type ChatFormValues = {
  message: string;
  image: string;
  video: string;
  file: string;
};

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const FieldContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTextarea = styled(LightTextarea)<{ $isOpen: boolean }>`
  ${({ theme: { colors, typography }, $isOpen }) => css`
    position: relative;
    display: flex;

    background-color: ${colors.greyScale[0]};
    border: 1px solid ${colors.greyScale[30]};
    border-radius: 12px;

    &:focus-within {
      border: 1px solid ${({ theme: { colors } }) => colors.greyScale[60]} !important;
    }

    svg {
      position: absolute;
      top: 8px;
      right: 16px;

      path {
        stroke: ${$isOpen ? colors.greyScale[100] : colors.greyScale[60]};
        transition: all 0.1s linear;
      }
    }

    textarea {
      width: 100%;
      max-width: none;
      min-height: 40px;
      max-height: 160px;
      border: none;

      padding: 12px 48px 12px 16px;
      background-color: ${colors.greyScale[0]};
      ${typography.caption_16_12_regular}

      :disabled {
        cursor: not-allowed;

        background-color: ${colors.greyScale[10]};
      }

      &:focus {
        border: none !important;
        padding: 12px 48px 12px 16px;
      }
    }
  `}
`;
