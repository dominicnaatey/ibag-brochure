import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { membersService } from "@/lib/supabase-service"

export default async function MembersPage() {
  // Fetch members from Supabase
  let allMembers: any[] = []
  
  try {
    allMembers = await membersService.getAll()
  } catch (error) {
    console.error("Failed to fetch members:", error)
  }

  const memberCategories = [
    {
      title: "Corporate Members",
      description: "Established businesses and corporations with Italian connections",
      benefits: [
        "Priority networking events",
        "Business directory listing",
        "Trade mission participation",
        "Quarterly business reports",
      ],
      price: "Contact for pricing",
    },
    {
      title: "Individual Members",
      description: "Entrepreneurs, professionals, and business enthusiasts",
      benefits: [
        "Monthly networking events",
        "Professional development workshops",
        "Member directory access",
        "Cultural events",
      ],
      price: "GHS 500/year",
    },
    {
      title: "Associate Members",
      description: "Supporting organizations and friends of IBAG",
      benefits: ["Selected events access", "Newsletter subscription", "Community updates", "Cultural activities"],
      price: "GHS 200/year",
    },
  ]

  // Use real members from database
  const featuredMembers = allMembers.slice(0, 6) // Show first 6 members

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Members</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join a thriving community of Italian businesses and professionals making their mark in Ghana.
              </p>
            </div>
          </div>
        </section>

        {/* Membership Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Membership Categories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the membership level that best fits your needs and goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {memberCategories.map((category, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Benefits Include:</h4>
                    <ul className="space-y-2">
                      {category.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-2xl font-bold text-gray-800 mb-4">{category.price}</p>
                    <Button className="w-full bg-gray-800 hover:bg-purple-600 text-white">Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Members */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Members</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover some of our distinguished members making a difference in Ghana's business landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex space-x-1">
                      <div className="w-1 h-6 bg-green-600 rounded-sm"></div>
                      <div className="w-1 h-6 bg-white border border-gray-200 rounded-sm"></div>
                      <div className="w-1 h-6 bg-red-600 rounded-sm"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-sm text-purple-600">{member.company || 'Individual Member'}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{member.position || member.membership_type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gray-800 rounded-lg p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Join IBAG?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Become part of a dynamic community that's shaping the future of Italian-Ghanaian business relations.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Start Your Application
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
