'use client';
import React from 'react';

type OnChangeProps = (value: string) => void;;
type OnFocusProps = (value: boolean) => void;
type OnKeyDownProps = (e: React.KeyboardEvent<HTMLInputElement>) => void;
type OnKeyUpProps = (e: React.KeyboardEvent<HTMLInputElement>) => void;

interface Emits {
    onChange?: OnChangeProps;
    onFocus?: OnFocusProps;
    onKeyDown?: OnKeyDownProps;
    onKeyUp?: OnKeyUpProps;
};

interface ITextInputProps extends Emits {
    label: string;
    name: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    endAdornment?: React.ReactNode;
}

const TextInput = (props: ITextInputProps) => {
    const {
        label,
        name,
        type = 'text',
        placeholder,
        defaultValue = '',
        value = '',
        endAdornment,
        onChange,
        onFocus,
        onKeyDown,
        onKeyUp
    } = props;
    //state
    const [inputValue, setInputValue] = React.useState(defaultValue || value);
    const [isFocus, setIsFocus] = React.useState(false);
    const [isUsed, setIsUsed] = React.useState(Boolean(defaultValue || value));

    const handleFocus = () => {

        setIsFocus(true);
        onFocus && onFocus(true);
    };

    const handleBlur = () => {
        setIsFocus(false);
        setIsUsed(inputValue.length > 0);
        onFocus && onFocus(false);
    };
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange && onChange(e.target.value);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown && onKeyDown(e);
    };
    
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyUp && onKeyUp(e);
    };
    
    React.useEffect(() => {
        setInputValue(value);
    }, [value]);

    React.useEffect(() => {
        setIsUsed((isFocus || (!isFocus && inputValue.length > 0)));
    }, [inputValue, isFocus]);

    return (
        <div className="relative inline-flex flex-col mt-2 mb-1">
            <label
                className={[
                    "absolute z-[1] inset-0 h-fit overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none select-none scale-100 transition-text-input-label origin-top-left translate-x-[13px]",
                    isFocus ? 'text-yellow-300' : 'text-slate-400',
                    isUsed ? 'max-w-[calc(133%-32px)] translate-y-[-9px] scale-75' : `max-w-[calc(100%-24px)] translate-y-3 scale-100`
                ].join(' ')}
            >
                {label}
            </label>
            <div className="relative inline-flex items-center rounded-lg box-border overflow-hidden">
                <input 
                    {...{name, placeholder, type}}
                    className={[
                        "flex-1 block w-full px-3 py-3 bg-transparent focus:outline-0 transition-opacity appearance-none outline-none",
                        isUsed ? 'opacity-1' : 'opacity-0',
                    ].join(' ')}
                    autoComplete='off'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                />
                {
                    endAdornment &&
                    <div className="flex max-h-[48px] p-3 overflow-hidden items-center whitespace-nowrap ml-2 text-slate-400">
                        {endAdornment}
                    </div>
                }
                <fieldset
                    className={[
                        "absolute inset-0 -top-[5px] px-2 border border-solid rounded-[inherit] pointer-events-none overflow-hidden",
                        isFocus ? 'border-yellow-300' : 'border-slate-300',
                        !isUsed && 'border-slate-300',
                    ].join(' ')}>
                    <legend
                        className={[
                            "block w-auto h-[11px] invisible text-xs whitespace-nowrap overflow-hidden transition-text-input-legend",
                            isUsed ? 'max-w-full' : 'max-w-[0.01px]'
                        ].join(' ')}
                    >
                        <span className="inline-block px-1 opacity-0 visible">{label}</span>
                    </legend>
                </fieldset>
            </div>
        </div>
    );
};

export default TextInput;