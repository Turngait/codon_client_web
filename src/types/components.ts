import { ChangeEvent, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

export enum BtnSize {
  largeBtn = "largeBtn",
  mediumBtn="mediumBtn"
}

export enum BtnType {
  dangerBtn = "dangerBtn",
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string,
  onClick?: () => void,
  size?: BtnSize,
  btnType?: BtnType,
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  name?: string,
  value?: string | number,
  maxlength?: number,
  maxValue?: number,
}

export interface ICheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  name?: string,
  title: string,
  checked?: boolean
}

export interface IPlsButton {
  onClick: () => void;
  className?: string;
}
