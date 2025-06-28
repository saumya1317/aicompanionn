import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { subjects } from '@/constants'
import Navbar from '@/components/Navbar'



// Server component by default (no "use client"), allowing async fetches
const HomePage = async () => {
  // Showcase: first 3 companions (public or recent)


  return (
    <main className="flex flex-col gap-24 pt-32">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center max-w-3xl mx-auto">


        <Image
          src="/readme/hero.png"
          alt="AI tutor illustration"
          width={600}
          height={450}
          className="max-w-full h-auto object-contain rounded-xl border border-border"
        />
        <h1 className="text-5xl font-bold leading-tight">
          Real-time&nbsp;
          <span className="text-primary">AI tutoring</span> for every learner.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Build personalised AI companions that explain concepts, quiz you, and track your progress — all in&nbsp;
          seconds.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button size="lg">Start learning</Button>
          </Link>
          <Link href="/companions" className="underline hover:no-underline">
            Browse companions →
          </Link>
        </div>
      </section>

      {/* Subjects Showcase */}
      <section className="flex flex-col gap-8 items-center text-center">
        <h2 className="text-3xl font-semibold">Master any subject</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {subjects.map((s) => (
            <span
              key={s}
              className="subject-badge capitalize hover:opacity-90 transition-opacity"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section mx-auto">
        <span className="cta-badge text-sm font-semibold">Free Beta</span>
        <h3 className="text-2xl font-bold max-w-md">
          Join thousands of learners building their knowledge with Convotutor.
        </h3>
        <Link href="/sign-in">
          <Button size="lg" variant="secondary">
            Get started — it&apos;s free
          </Button>
        </Link>
      </section>
    </main>
  )
}

export default HomePage
