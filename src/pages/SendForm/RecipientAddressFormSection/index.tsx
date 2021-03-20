import React from "react";

interface IRecipientAddressFormSection {
  recipientAddress: string;
  onChange: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const RecipientAddressFormSection: React.FC<IRecipientAddressFormSection> = ({
  recipientAddress,
  onChange,
}) => {
  return (
    <div className="mb-10">
      <div className="text-base text-text-light">Send To:</div>
      <div className="mt-2.5">
        <input
          className="text-base text-black text-center font-semibold w-full px-5 py-2.5 rounded-lg focus:outline-none"
          defaultValue={recipientAddress}
          onChange={onChange}
          type="text"
          placeholder="Type or Paste address"
        />
      </div>
    </div>
  );
};
