'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateAccessCode } from '@/lib/hash';

interface GateProps {
  slug: string;
  accessCodeHash: string;
  onValidCode: (code: string) => void;
}

export function Gate({ slug, accessCodeHash, onValidCode }: GateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!code.trim()) {
      setError('please enter an access code');
      setIsSubmitting(false);
      return;
    }

    if (validateAccessCode(code, accessCodeHash)) {
      onValidCode(code);
    } else {
      setError('sorry; this box wasn\'t meant for you.');
      setCode('');
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <div className="flex justify-start mb-8">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-black transition-colors"
          >
            ← back
          </Link>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-3xl font-normal text-black lowercase mb-4">
            {slug}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="enter access code"
              className="w-full px-4 py-3 text-center text-lg lowercase bg-neutral-50 border border-neutral-300 rounded focus:outline-none focus:border-neutral-500 transition-colors"
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-center text-sm text-neutral-600 lowercase">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-black text-white text-sm lowercase rounded hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'checking...' : 'unlock'}
          </button>
        </form>

        <div className="text-center mt-12 space-y-2">
          <p className="text-xs text-neutral-500 italic">a private letter</p>
        </div>
      </div>
    </main>
  );
}
