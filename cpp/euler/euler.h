//
//  euler.h
//
//  Created by Peter Benson on 10/3/16.
//  Copyright © 2016 Peter Benson. All rights reserved.
//

#ifndef EULER_H
#define EULER_H

#include <vector>
#include <map>

std::vector<int64_t> allFactors(int64_t n);
int64_t comb(int a, int b);
int64_t factorial(int n);
int gcd(int a, int b);
bool isPalindrome(const int64_t n);
bool isPrime(const int64_t n);
bool isPrimeFast(const int64_t n);
int32_t kthPrime(int k);
int64_t leastPrimeFactor(int64_t n);
int64_t maxPrimeFactor(int64_t n);
int32_t nextPrimeAfter(int32_t n);
std::map<int64_t, int64_t> primeToCountMap(int64_t n);
int64_t sumDivisors(int64_t n);
int64_t sumProperDivisors(int64_t n);

#endif
