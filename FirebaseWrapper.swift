//
//  FirebaseWrapper.swift
//  Juvenlie Test
//
//  Created by Alexander Chen on 5/30/19.
//  Copyright © 2019 Alexander Chen. All rights reserved.
//

import Foundation
import Firebase

let rootRef = Database.database().reference()
let courtroomRef = rootRef.child("courtroom")
let glossaryRef = rootRef.child("glossary")

func getCourtroomTerms(done: @escaping (NSDictionary?) -> ()) {
	courtroomRef.observeSingleEvent(of: .value, with: { (snapshot) in
		let terms = snapshot.value as? NSDictionary
		done(terms)
	}) { (error) in
		print(error.localizedDescription)
	}
}

func getGlossaryTerms(done: @escaping (NSDictionary?) -> ()) {
	glossaryRef.observeSingleEvent(of: .value, with: { (snapshot) in
		let terms = snapshot.value as? NSDictionary
		done(terms)
	}) { (error) in
		print(error.localizedDescription)
	}
}
