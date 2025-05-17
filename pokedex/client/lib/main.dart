import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(MaterialApp(
  debugShowCheckedModeBanner: false,
  home: SignInPage(),
));

class PokedexApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PookieDex',
      theme: ThemeData(primarySwatch: Colors.red),
      home: PokedexPage(userEmail: 'user@example.com'),
    );
  }
}

class PokedexPage extends StatefulWidget {
  final String userEmail;

  PokedexPage({required this.userEmail});

  @override
  _PokedexPageState createState() => _PokedexPageState();
}

class _PokedexPageState extends State<PokedexPage> {
  List<dynamic> pokemonList = [];
  bool isLoading = true;
  TextEditingController searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    fetchPokemon();
  }

  Future<void> fetchPokemon() async {
    final response = await http.get(Uri.parse('https://pokeapi.co/api/v2/pokemon?limit=198'));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        pokemonList = data['results'];
        isLoading = false;
      });
    } else {
      throw Exception('Pokémon fetching unsucessful');
    }
  }

  Future<Map<String, dynamic>> fetchPokemonDetails(String url) async {
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load details');
    }
  }

  void showPokemonDialog(String url) async {
    try {
      final details = await fetchPokemonDetails(url);
      final types = (details['types'] as List)
          .map((type) => type['type']['name'])
          .join(', ');

      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('${details['name'].toString().toUpperCase()}', textAlign: TextAlign.center),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (details['sprites']['front_default'] != null)
                  Image.network(details['sprites']['front_default']),
                Text("Base Experience: ${details['base_experience']} \n"
                    "Types: $types \n"
                    "Hp: ${details["stats"][0]["base_stat"]} \n"
                    "Attack: ${details["stats"][1]["base_stat"]} \n"
                    "Speed: ${details["stats"][5]["base_stat"]}"),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('Close'),
              ),
            ],
          );
        },
      );
    } catch (_) {
      _showErrorDialog("Failed to load Pokémon details.");
    }
  }

  Future<void> _searchPokemon() async {
    String pokemon_name = searchController.text.trim();
    if (pokemon_name.isEmpty) return;

    final url = 'https://pokeapi.co/api/v2/pokemon/$pokemon_name';
    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        final pokemonData = json.decode(response.body);
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PokemonDetailsPage(pokemonData: pokemonData),
          ),
        );
      } else {
        _showErrorDialog('$pokemon_name not found!');
      }
    } catch (e) {
      _showErrorDialog('Error fetching Pokémon data');
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Error'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }

  String getImageUrl(int index) {
    final pokemonId = index + 1;
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$pokemonId.png';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset('images/pookiedex.png', height: 160, width: 140),
            SizedBox(width: 10),
            Expanded(
              child: TextField(
                controller: searchController,
                decoration: InputDecoration(
                  hintText: 'Search Pokémon',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            IconButton(
              icon: Icon(Icons.search),
              onPressed: _searchPokemon,
            ),

          ],
        ),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.blue),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 8),
                  Text("user: ${widget.userEmail}"),
                ],
              ),
            ),
            ListTile(
              leading: Image.asset('images/pokeball.png', height: 40, width: 40),
              title: Text('Captured Pokemon'),
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (_) => SignInPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('Logout'),
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (_) => SignInPage()),
                );
              },
            ),

          ],
        ),
      ),

      body:
      GridView.builder(
        itemCount: pokemonList.length,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
        ),
        itemBuilder: (context, index) {
          final pokemon = pokemonList[index];
          return GestureDetector(
            onTap: () => showPokemonDialog(pokemon['url']),
            child: Card(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.network(getImageUrl(index), height: 80, width: 60),
                  SizedBox(height: 8),
                  Text(
                    pokemon['name'].toString().toUpperCase(),
                    style: TextStyle(fontSize: 12),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class PokemonDetailsPage extends StatelessWidget {
  final Map<String, dynamic> pokemonData;

  PokemonDetailsPage({required this.pokemonData});

  @override
  Widget build(BuildContext context) {
    final name = pokemonData['name'].toString().toUpperCase();
    final types = (pokemonData['types'] as List)
        .map((type) => type['type']['name'])
        .join(', ');
    final abilities = (pokemonData["abilities"] as List)
        .map((ability) => ability["ability"]["name"])
        .join(", ");
    final imageUrl = pokemonData['sprites']['front_default'];

    return Scaffold(
      appBar: AppBar(title: Text(name)),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            if (imageUrl != null) Image.network(imageUrl),
            Text("Base Experience: ${pokemonData['base_experience']} \n"
                "Types: $types \n"
                "Abilities : $abilities \n"
                "HP: ${pokemonData["stats"][0]["base_stat"]} \n"
                "Attack: ${pokemonData["stats"][1]["base_stat"]} \n"
                "Speed: ${pokemonData["stats"][5]["base_stat"]} \n"),
          ],
        ),
      ),
    );
  }
}

class SignUpPage extends StatefulWidget {
  @override
  _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  Future<void> _signup() async {
    final response = await http.post(
      Uri.parse('http://127.0.0.1:5000/signup'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': _emailController.text,
        'password': _passwordController.text,
      }),
    );

    if (response.statusCode == 200) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => PokedexPage(userEmail: _emailController.text),
        ),
      );

    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Signup failed')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign Up')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _emailController, decoration: InputDecoration(labelText: 'Email')),
            TextField(controller: _passwordController, decoration: InputDecoration(labelText: 'Password'), obscureText: true),
            ElevatedButton(onPressed: _signup, child: Text('Sign Up')),
            TextButton(
              onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => SignInPage())),
              child: Text('Already have an account? Sign in'),
            ),
          ],
        ),
      ),
    );
  }
}

class SignInPage extends StatefulWidget {
  @override
  _SignInPageState createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  Future<void> _signin() async {
    final response = await http.post(
      Uri.parse('http://127.0.0.1:5000/signin'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': _emailController.text,
        'password': _passwordController.text,
      }),
    );

    if (response.statusCode == 200) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => PokedexPage(userEmail: _emailController.text),
        ),
      );
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Invalid Credentials')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign In')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _emailController, decoration: InputDecoration(labelText: 'Email')),
            TextField(controller: _passwordController, decoration: InputDecoration(labelText: 'Password'), obscureText: true),
            ElevatedButton(onPressed: _signin, child: Text('Sign In')),
            TextButton(
              onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => SignUpPage())),
              child: Text('Don\'t have an account? Sign up'),
            ),
          ],
        ),
      ),
    );
  }
}
