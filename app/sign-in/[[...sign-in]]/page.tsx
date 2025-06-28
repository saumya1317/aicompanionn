import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignIn appearance={{ elements: { card: 'shadow-lg' } }} />
    </div>
  )
}