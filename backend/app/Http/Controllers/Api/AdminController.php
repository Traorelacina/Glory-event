<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Contact;
use App\Models\Produit;
use App\Models\Service;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function dashboard(): JsonResponse
    {
        try {
            $stats = [
                'total_services' => Service::count(),
                'total_produits' => Produit::count(),
                'total_commandes' => Commande::count(),
                'commandes_en_attente' => Commande::where('status', 'en_attente')->count(),
                'total_contacts' => Contact::count(),
                'total_portfolio' => Portfolio::count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques'
            ], 500);
        }
    }

    /**
     * Get recent orders.
     */

    public function storeProduit(Request $request): JsonResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:produits,slug',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'image' => 'nullable|string|max:255',
        'category' => 'required|string|max:100',
        'in_stock' => 'nullable|boolean',
        'featured' => 'nullable|boolean',
    ]);

    try {
        $produit = Produit::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image ?? '',
            'category' => $request->category,
            'in_stock' => $request->in_stock ?? 1,
            'featured' => $request->featured ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'data' => $produit
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la création du produit',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function recentOrders(): JsonResponse
    {
        try {
            $commandes = Commande::with('produits')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $commandes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des commandes récentes'
            ], 500);
        }
    }


    public function produits(): JsonResponse
{
    try {
        $produits = Produit::all();

        return response()->json([
            'success' => true,
            'data' => $produits
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la récupération des produits'
        ], 500);
    }
}


public function commandes(): JsonResponse
{
    try {
        $commandes = Commande::with('produits')->get();
        return response()->json([
            'success' => true,
            'data' => $commandes
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la récupération des commandes',
        ], 500);
    }
}



    /**
     * Get recent contacts.
     */
    public function recentContacts(): JsonResponse
    {
        try {
            $contacts = Contact::orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $contacts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des contacts récents'
            ], 500);
        }
    }
}