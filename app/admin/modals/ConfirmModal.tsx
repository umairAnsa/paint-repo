'use client';

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <p className="text-sm font-semibold text-[#111827]">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel}
            className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50">
            No
          </button>
          <button onClick={onConfirm}
            className="rounded-xl bg-red-500 px-5 py-2 text-sm font-bold text-white hover:bg-red-600">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
