// One list of journal posts, used by the home page, /blog and /blog/:id.
// Bodies are plain semantic JSX; the article wrapper styles p / h2 / ul.

const img = (id) => `https://images.unsplash.com/${id}?q=75&w=1200&auto=format&fit=crop`;

export const posts = [
    {
        id: 1,
        title: 'The Magic of Argan Oil: Liquid Gold for Your Hair',
        summary: "Why argan oil is called 'liquid gold', and how it adds moisture and shine without weighing hair down.",
        category: 'Ingredients',
        imageUrl: img('photo-1608248597279-f99d160bfbc8'),
        author: 'Exia Organics',
        date: 'Jan 15, 2024',
        readTime: 5,
        content: (
            <>
                <p>Argan oil has been a staple in beauty rituals for centuries, often referred to as "liquid gold" by those who know its transformative powers. Harvested from the kernels of the argan tree, native to Morocco, this rich oil is packed with essential nutrients that work wonders for hair health.</p>
                <h2>Why argan oil?</h2>
                <p>Rich in fatty acids and Vitamin E, argan oil provides intense hydration without weighing hair down. It mimics the natural oils produced by our scalp, making it an excellent choice for balancing oil production while nourishing dry ends.</p>
                <ul>
                    <li><strong>Hydration:</strong> deeply moisturizes strands from the inside out.</li>
                    <li><strong>Shine:</strong> smooths the hair cuticle for a glass-like finish.</li>
                    <li><strong>Protection:</strong> acts as a natural barrier against heat and environmental damage.</li>
                </ul>
            </>
        ),
    },
    {
        id: 2,
        title: 'Hot Season Hair Care: Protect & Shine',
        summary: 'Sun, sweat and dust pull moisture out of hair fast. A simple routine to keep it soft through the heat.',
        category: 'Tips & Tricks',
        imageUrl: img('photo-1515377905703-c4788e51af15'),
        author: 'Exia Organics',
        date: 'Feb 10, 2024',
        readTime: 4,
        content: (
            <>
                <p>Strong sun, heat and dust can be harsh on your hair. UV rays and sweat strip away moisture, leaving strands dry and brittle.</p>
                <h2>Hydrate, hydrate, hydrate</h2>
                <p>Just like your skin, your hair needs extra hydration in the heat. Switch to a moisturizing shampoo and conditioner, and don't skip the leave-in.</p>
            </>
        ),
    },
    {
        id: 3,
        title: 'Sustainability at Exia: Our Promise to the Planet',
        summary: 'How we think about packaging and ingredients, and the small choices that add up.',
        category: 'Sustainability',
        imageUrl: img('photo-1522337660859-02fbefca4702'),
        author: 'Exia Organics',
        date: 'Mar 05, 2024',
        readTime: 6,
        content: (
            <>
                <p>At Exia Organics, we believe that beauty shouldn't come at a cost to the earth. That's why sustainability sits at the core of what we make.</p>
                <h2>Ethical sourcing</h2>
                <p>We prefer suppliers who look after their soil and pay fair wages, so the communities behind our ingredients are cared for too.</p>
            </>
        ),
    },
    {
        id: 4,
        title: 'DIY Hair Masks: Spa Day at Home',
        summary: 'Two kitchen-cupboard masks for soft, strong hair: an avocado hydrator and a rice water rinse.',
        category: 'Tutorials',
        imageUrl: img('photo-1552693673-1bf958298935'),
        author: 'Exia Organics',
        date: 'Mar 12, 2024',
        readTime: 7,
        content: (
            <>
                <p>Sometimes the best ingredients are found right in your kitchen. A homemade mask is a fun, effective way to treat specific hair concerns while enjoying a slow evening at home.</p>
                <h2>The avocado hydrator</h2>
                <p>Mash half a ripe avocado with a tablespoon of honey and a teaspoon of olive oil. Apply to damp hair and leave for 20 minutes. Avocados are rich in biotin, which strengthens hair.</p>
                <h2>The rice water rinse</h2>
                <p>Soak rinsed rice in water for 24 hours, then use the water as a final rinse after shampooing.</p>
            </>
        ),
    },
    {
        id: 5,
        title: 'Understanding Hair Porosity',
        summary: 'The float test, and what low, medium and high porosity mean for the products you choose.',
        category: 'Education',
        imageUrl: img('photo-1580618672591-eb180b1a973f'),
        author: 'Exia Organics',
        date: 'Mar 20, 2024',
        readTime: 8,
        content: (
            <>
                <p>Knowing your hair porosity is the key to choosing the right products. It decides how well your hair absorbs and holds on to moisture.</p>
                <h2>The float test</h2>
                <p>Drop a clean strand of shed hair into a glass of water. If it sinks quickly, you have high porosity. If it floats, low porosity. If it hangs in the middle, medium.</p>
                <h2>Low porosity tips</h2>
                <p>Use gentle heat when conditioning to open the cuticle, and skip heavy oils that only sit on top of the strand.</p>
            </>
        ),
    },
    {
        id: 6,
        title: 'Protective Styles for Growth',
        summary: 'Braids, twists and buns can help you keep length. How to care for your scalp while you wear them.',
        category: 'Styles',
        imageUrl: img('photo-1624898230588-468ac64b6389'),
        author: 'Exia Organics',
        date: 'Apr 02, 2024',
        readTime: 6,
        content: (
            <>
                <p>Protective styling gives your hair a break from daily manipulation. Low-tension braids, twists and buns help you retain length.</p>
                <h2>Box braids maintenance</h2>
                <p>Keep your scalp moisturized with a light oil and sleep in a satin bonnet to prevent frizz. Don't leave them in too long, or the roots can mat.</p>
            </>
        ),
    },
    {
        id: 7,
        title: 'The Ultimate Guide to Scalp Health',
        summary: 'Dandruff and itch usually start with an unbalanced scalp. Where to begin.',
        category: 'Health',
        imageUrl: img('photo-1519699047748-40ba526612df'),
        author: 'Exia Organics',
        date: 'Apr 15, 2024',
        readTime: 7,
        content: (
            <>
                <p>Healthy hair starts with a healthy scalp. Dandruff, itchiness and oiliness often come from an unbalanced scalp.</p>
                <h2>Cleanse the build-up</h2>
                <p>Just like your face, your scalp collects product build-up and dead skin. A herbal clarifying wash once a week keeps it calm.</p>
            </>
        ),
    },
    {
        id: 8,
        title: "Aloe Vera: Nature's Soothing Gel",
        summary: 'Why aloe calms an irritated scalp, and how to use fresh gel from the leaf.',
        category: 'Ingredients',
        imageUrl: img('photo-1601646738981-2292025359a1'),
        author: 'Exia Organics',
        date: 'Apr 28, 2024',
        readTime: 4,
        content: (
            <>
                <p>Aloe vera is known for its soothing, moisturizing properties, and is a gentle friend to an irritated scalp.</p>
                <h2>Fresh aloe gel</h2>
                <p>Scoop the gel from a fresh leaf and blend it smooth. Apply directly to your scalp for quick relief from itching.</p>
            </>
        ),
    },
];

export const getPost = (id) => posts.find((p) => p.id === Number(id));
